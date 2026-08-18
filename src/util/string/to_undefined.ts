export const nullableStringToUndefined = (
  value?: string | null
): string | undefined => {
  return typeof value === 'string' ? value : undefined
}
