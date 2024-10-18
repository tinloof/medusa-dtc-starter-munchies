import {listCountries} from "@/data/medusa/regions";
import {type Header} from "@/types/sanity.generated";

import type {Country} from "../../country-selector/country-selector-dialog";

import Hamburger from ".";

export default async function HamburgerContainer({
  sanityData,
}: {
  sanityData: Header;
}) {
  const countries = (await listCountries()).filter(Boolean) as Country[];

  return <Hamburger countries={countries} data={sanityData} />;
}
