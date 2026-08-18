export const nullableNumberToUndefined = (
  value?: number | null
): number | undefined => {
  return typeof value === 'number' ? value : undefined
}
