/**
 * 数字左侧补零。
 *
 * @example
 * padStartNumber(5) // "05"
 * padStartNumber(12, 4) // "0012"
 */
export const padStartNumber = (
  value: string | number | undefined | null,
  length = 2,
  pad = '0'
): string => {
  if (value === undefined || value === null || value === '') {
    return ''
  }
  const number = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(number)) {
    return ''
  }
  return String(number).padStart(length, pad)
}

/**
 * 价格小数位格式化。
 *
 * 将数字格式化为固定小数位，不足位数补零。
 *
 * @example
 * fixedNumber(1) // "1.00"
 * fixedNumber(1.5) // "1.50"
 * fixedNumber(12.345, 2) // "12.35"
 */
export const fixedNumber = (
  value: string | number | undefined | null,
  digits = 2
): string => {
  if (value === undefined || value === null || value === '') {
    return ''
  }

  const number = Number(value)

  if (Number.isNaN(number)) {
    return ''
  }

  return number.toFixed(digits)
}
