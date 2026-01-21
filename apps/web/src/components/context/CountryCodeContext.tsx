"use client";

import { createContext, useContext, type PropsWithChildren } from "react";

type CountryCodeContextType = {
  countryCode: string;
  defaultCountryCode: string;
};

type CountryCodeProviderProps = PropsWithChildren<CountryCodeContextType>;

export const CountryCodeContext = createContext<
  CountryCodeContextType | undefined
>(undefined);

export function CountryCodeProvider({
  children,
  countryCode,
  defaultCountryCode,
}: CountryCodeProviderProps) {
  return (
    <CountryCodeContext.Provider value={{ countryCode, defaultCountryCode }}>
      {children}
    </CountryCodeContext.Provider>
  );
}

export function useCountryCode() {
  const context = useContext(CountryCodeContext);
  if (context === undefined) {
    throw new Error("useCountryCode must be used within a CountryCodeProvider");
  }
  return context.countryCode;
}

export function useDefaultCountryCode() {
  const context = useContext(CountryCodeContext);
  if (context === undefined) {
    throw new Error("useDefaultCountryCode must be used within a CountryCodeProvider");
  }
  return context.defaultCountryCode;
}

export function useIsDefaultCountry() {
  const context = useContext(CountryCodeContext);
  if (context === undefined) {
    throw new Error("useIsDefaultCountry must be used within a CountryCodeProvider");
  }
  return context.countryCode === context.defaultCountryCode;
}
