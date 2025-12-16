export function truncate(str: string, maxLength: number) {
  if (str.length < maxLength) {
    return str;
  }

  const firstWhitespaceAfterTruncation =
    str.slice(maxLength).search(/\s/) + maxLength;

  return str.slice(0, firstWhitespaceAfterTruncation) + "...";
}
