// api/src/module/city/city.service.ts
import { prisma } from "@repo/database";

export class CityService {
  // WARNING: Add pagination and user can also type and search for a city
  static async getCities() {
    return prisma.city.findMany({
      select: {
        id: true,
        name: true,
        stateRegion: true,
        countryCode: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }
}
