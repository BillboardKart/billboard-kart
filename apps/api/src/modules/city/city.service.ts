// api/src/module/city/city.service.ts
import { prisma } from "@repo/database";
// import { supabase } from "@/src/plugins/auth.plugin";

export class CityService {
  static async getBillboardCities() {
    const rows = await prisma.$queryRaw<
      Array<{
        id: string;
        name: string;
        stateRegion: string | null;
        countryCode: string;
        latitude: number | null;
        longitude: number | null;
      }>
    >`
      SELECT
        id::text AS id,
        name,
        state_region AS "stateRegion",
        country_code AS "countryCode",
        ST_Y(centroid::geometry) AS latitude,
        ST_X(centroid::geometry) AS longitude
      FROM cities
      WHERE country_code = 'IN'
        AND lower(name) IN ('pune', 'mumbai', 'bombay')
    `;

    const citiesByLabel = new Map<string, (typeof rows)[number]>();
    for (const city of rows) {
      const label = city.name.toLowerCase() === "pune" ? "Pune" : "Bombay";
      const existing = citiesByLabel.get(label);
      if (!existing || city.name.toLowerCase() === "bombay") {
        citiesByLabel.set(label, city);
      }
    }

    return [citiesByLabel.get("Pune"), citiesByLabel.get("Bombay")].filter(
      (city): city is NonNullable<typeof city> => Boolean(city),
    );
  }

  static async getCities() {
    // const cols = `id, name, state_region, country_code`;

    // const { data: cities, error } = await supabase
    //   .from("cities")
    //   .select(cols)
    //   .order("name", { ascending: true });

    // if (error) {
    //   throw new Error(`Failed to fetch cities: ${error.message}`);
    // }

    // return cities;

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
