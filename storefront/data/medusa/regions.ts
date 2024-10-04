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
