import { isEmpty } from "../is-empty";

interface ConvertToLocaleParams {
  amount: number;
  currency_code: string;
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

export const convertToLocale = ({
  amount,
  currency_code,
  locale = "en-US",
  maximumFractionDigits,
  minimumFractionDigits,
}: ConvertToLocaleParams) =>
  currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        currency: currency_code,
        maximumFractionDigits,
        minimumFractionDigits,
        style: "currency",
      }).format(amount)
    : amount.toString();
