import type {HttpTypes} from "@medusajs/types";

import medusaError from "@/utils/medusa/error";
import {cache} from "react";

import client from "./client";

export const listRegions = cache(async function () {
  return client.store.region
    .list({}, {next: {tags: ["regions"]}})
    .then(({regions}) => regions)
    .catch(medusaError);
});

export const listCountries = cache(async function () {
  const regions = await listRegions();
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
    })),
  );

  return countries.filter(
    (country, index, self) =>
      index === self.findIndex((t) => t?.iso_2 === country?.iso_2),
  );
});

export const retrieveRegion = cache(async function (id: string) {
  return client.store.region
    .retrieve(id, {}, {next: {tags: ["regions"]}})
    .then(({region}) => region)
    .catch(medusaError);
});

const regionMap = new Map<string, HttpTypes.StoreRegion>();

export const getRegion = cache(async function (countryCode: string) {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode);
    }

    const regions = await listRegions();

    if (!regions) {
      return null;
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region);
      });
    });

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("us");

    return region;
  } catch (e: any) {
    return null;
  }
});
