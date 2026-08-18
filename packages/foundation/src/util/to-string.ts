export const numberToString = (
  value: number | null | undefined
): string | null | undefined => {
  return typeof value === 'number' ? value.toString() : value
}
