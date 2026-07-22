// api/src/modules/user/user.service.ts
import type {
  CurrentUserResponse,
  OnboardUserRequest,
} from "@/src/types/user.types";
import { prisma, UserStatus } from "@repo/database";
import type { User } from "@supabase/supabase-js";

export class UsersService {
  private static passwordHashPromise: Promise<string> | null = null;

  private static readonly userTenantId = (() => {
    const tenantId = process.env.TENANT_ID!;
    if (!tenantId) throw new Error("Missing `TENANT_ID`");
    return tenantId;
  })();

  /**
   * Fetches the current user state based on the Supabase User object.
   * If the user isn't in the database, they are marked as not onboarded.
   */
  static async getCurrentUser(
    authUser: User | null,
  ): Promise<CurrentUserResponse> {
    if (!authUser || !authUser.id) return { authenticated: false };

    const userId = authUser.id;

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        tenantId: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        primaryRole: true,
        status: true,
      },
    });

    // Valid token, but hasn't completed app onboarding (no Prisma record)
    if (!dbUser) {
      return {
        authenticated: true,
        isOnboarded: false,
        auth: {
          id: userId,
          email: authUser.email || "", // Supabase email can technically be undefined if using phone auth
          fullName: authUser.user_metadata?.full_name || null,
          avatarUrl: authUser.user_metadata?.avatar_url || null,
        },
      };
    }

    // Valid token, completely onboarded
    return {
      authenticated: true,
      isOnboarded: true,
      user: {
        id: dbUser.id,
        tenantId: dbUser.tenantId,
        email: dbUser.email,
        fullName: dbUser.fullName,
        avatarUrl: dbUser.avatarUrl,
        primaryRole: dbUser.primaryRole,
        status: dbUser.status,
      },
    };
  }

  static async onboardUser(
    authUser: User | null,
    body: OnboardUserRequest,
  ): Promise<CurrentUserResponse> {
    if (!authUser?.id) return { authenticated: false };

    const existing = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: { id: true },
    });

    if (existing) throw new Error("User has already completed onboarding");

    const city = await prisma.$queryRaw<
      { id: string; lat: number; lng: number }[]
    >`
        SELECT
            id,
            ST_Y(centroid::geometry) AS lat,
            ST_X(centroid::geometry) AS lng
        FROM cities
        WHERE id = ${body.cityId}
        LIMIT 1;
    `;

    if (city.length === 0) throw new Error("Invalid city selected.");

    const selectedCity = city[0]!;

    const userData = {
      id: authUser.id,
      tenantId: this.userTenantId,
      email: authUser.email!,
      fullName: body.fullName,
      phone: body.phone,
      businessName: body.businessName,
      businessUrl: body.businessUrl,
      primaryRole: body.primaryRole,
      status: UserStatus.active,
      passwordHash: await this.getInitialPasswordHash(),
      defaultCityId: selectedCity.id,
      defaultLat: selectedCity.lat,
      defaultLng: selectedCity.lng,
      avatarUrl: authUser.user_metadata?.avatar_url || null,
    };

    await prisma.$transaction(async (tx) => tx.user.create({ data: userData }));

    return {
      authenticated: true,
      isOnboarded: true,
      user: {
        id: userData.id,
        tenantId: this.userTenantId,
        email: userData.email,
        fullName: userData.fullName,
        avatarUrl: userData.avatarUrl,
        primaryRole: userData.primaryRole,
        status: userData.status as string,
      },
    };
  }

  static async getInitialPasswordHash(): Promise<string> {
    if (!this.passwordHashPromise) {
      this.passwordHashPromise = Bun.password.hash(
        process.env.INITIAL_USER_PASSWORD!,
        { algorithm: "argon2id" },
      );
    }

    return this.passwordHashPromise;
  }
}
