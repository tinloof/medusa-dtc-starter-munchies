import {capitalize} from "./capitalize";

export const formatDate = (
  date: Date | string,
  includeTime: boolean = false,
): string => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    timeZone: "America/Toronto",
    weekday: "short",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
    timeZone: "America/Toronto",
  };

  const options: Intl.DateTimeFormatOptions = includeTime
    ? {...dateOptions, ...timeOptions}
    : dateOptions;

  return capitalize(
    new Intl.DateTimeFormat("fr-CA", options).format(new Date(date)),
  );
};
