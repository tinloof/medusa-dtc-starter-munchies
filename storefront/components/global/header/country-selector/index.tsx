import {listCountries} from "@/data/medusa/regions";

import type {Country} from "./country-selector-dialog";

import Dialog from "./country-selector-dialog";

export async function CountrySelector() {
  const countries = (await listCountries()).filter(Boolean) as Country[];

  return <Dialog countries={countries} />;
}
