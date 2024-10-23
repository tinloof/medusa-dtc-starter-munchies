export const isObject = (input: any) => input instanceof Object;
export const isArray = (input: any) => Array.isArray(input);
export const isEmpty = (input: any) => {
  return (
    input === null ||
    input === undefined ||
    (isObject(input) && Object.keys(input).length === 0) ||
    (isArray(input) && (input as any[]).length === 0) ||
    (typeof input === "string" && input.trim().length === 0)
  );
};

type ConvertToLocaleParams = {
  amount: number;
  currency_code: string;
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
};

export const convertToLocale = ({
  amount,
  currency_code,
  locale = "en-US",
  maximumFractionDigits,
  minimumFractionDigits,
}: ConvertToLocaleParams) => {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        currency: currency_code,
        maximumFractionDigits,
        minimumFractionDigits,
        style: "currency",
      }).format(amount)
    : amount.toString();
};
