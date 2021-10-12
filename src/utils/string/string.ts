/**
 * Convert a string value into a kabab-formatted string.
 *
 * @internal
 * @param value - String value to convert to kabab case.
 * @returns - Value converted to kabab case.
 */
export const toKabab = (value: string): string => value
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .join('-')
  .toLowerCase();
