import type { HttpTypes } from "@medusajs/types"

import client from "./client";
import medusaError from "./error";

const regionMap = new Map<string, HttpTypes.StoreRegion>();

export async function listRegions() {

  return client.store.region
    .list({}, { next: { tags: ["regions"] } })
    .then(({ regions }) => regions)
    .catch(medusaError)
}

export async function getRegion(countryCode: string) {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode);
    }

    const regions = await listRegions();

    if (!regions) {
      return null;
    }

    for (const region of regions) {
      for (const country of region.countries ?? []) {
        regionMap.set(country?.iso_2 ?? "", region);
      }
    }

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("us");

    return region;
  } catch {
    return null;
  }
}

export async function listCountries() {
  const regions = await listRegions()
  const countries = regions.flatMap((region) =>
    region.countries?.map((country) => ({
      code: country.iso_2,
      currency: {
        code: region.currency_code,
        symbol: new Intl.NumberFormat("en-US", {
          currency: region.currency_code,
          style: "currency",
        })
          .format(9)
          .split("9")[0],
      },
      name: country.display_name,
    }))
  );

  return countries.filter(
    (country, index, self) =>
      index === self.findIndex((t) => t?.code === country?.code)
  );

}
