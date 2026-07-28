/**
 * 数字左侧补零。
 *
 * @example
 * padStartNumber(5) // "05"
 * padStartNumber(12, 4) // "0012"
 */
export const padStartNumber = (value: number, length = 2, pad = '0'): string =>
  String(value).padStart(length, pad)
