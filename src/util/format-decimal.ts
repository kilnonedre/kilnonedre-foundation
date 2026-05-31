export const formatDecimal = (
  value: number | string | null | undefined,
  digits = 2
): string => {
  const num = Number(value)

  if (Number.isNaN(num)) {
    return (0).toFixed(digits)
  }

  return num.toFixed(digits)
}
