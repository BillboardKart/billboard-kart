// api/src/module/city/city.service.ts
import { prisma } from "@repo/database";
// import { supabase } from "@/src/plugins/auth.plugin";

export class CityService {
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
