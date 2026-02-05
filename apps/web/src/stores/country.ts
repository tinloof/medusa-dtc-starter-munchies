import { useStore } from "@nanostores/react";
import { atom, computed } from "nanostores";

// Atoms
export const $countryCode = atom<string>("");
export const $defaultCountryCode = atom<string>("");
export const $pathname = atom<string>("");

// Computed
export const $isDefaultCountry = computed(
  [$countryCode, $defaultCountryCode],
  (country, defaultCountry) => country === defaultCountry
);

// Helper to set all values at once
export function setCountryContext(config: {
  countryCode: string;
  defaultCountryCode: string;
  pathname: string;
}) {
  $countryCode.set(config.countryCode);
  $defaultCountryCode.set(config.defaultCountryCode);
  $pathname.set(config.pathname);
}
export function useCountryCode() {
  return useStore($countryCode);
}

export function useDefaultCountryCode() {
  return useStore($defaultCountryCode);
}

export function useIsDefaultCountry() {
  return useStore($isDefaultCountry);
}

export function useCountryCodeContext() {
  return {
    countryCode: useStore($countryCode),
    defaultCountryCode: useStore($defaultCountryCode),
    pathname: useStore($pathname),
  };
}
