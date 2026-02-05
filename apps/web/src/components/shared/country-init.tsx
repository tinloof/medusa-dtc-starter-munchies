import { $countryCode, $defaultCountryCode, $pathname } from "@/stores/country";

interface Props {
  countryCode: string;
  defaultCountryCode: string;
  pathname: string;
}

export function CountryInit(props: Props) {
  $countryCode.set(props.countryCode);
  $defaultCountryCode.set(props.defaultCountryCode);
  $pathname.set(props.pathname);
  return null;
}
