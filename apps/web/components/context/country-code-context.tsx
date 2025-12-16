"use client";
import type {PropsWithChildren} from "react";

import {createContext, useContext} from "react";

type CountryCodeContextType = {
  countryCode: string;
};

type CountryCodeProviderProps = PropsWithChildren<CountryCodeContextType>;

export const CountryCodeContext = createContext<
  CountryCodeContextType | undefined
>(undefined);

export function CountryCodeProvider({
  children,
  countryCode,
}: CountryCodeProviderProps) {
  return (
    <CountryCodeContext.Provider value={{countryCode}}>
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
