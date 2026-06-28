/**
 * 将空字符串转换为 undefined。
 *
 * 常用于 Zod 的 preprocess 场景：
 * - 去除字符串首尾空白。
 * - 空字符串（包括仅包含空白字符）转换为 undefined。
 * - 非字符串值保持原样，由后续 Schema 校验。
 *
 * 示例：
 * - '' => undefined
 * - '   ' => undefined
 * - ' hello ' => 'hello'
 * - null => null
 * - 123 => 123
 *
 * @param value 待处理的值
 * @returns 去除首尾空格后的字符串；若为空则返回 undefined；非字符串保持原值。
 */
export const emptyToUndefined = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value
  }

  const trimmed = value.trim()
  return trimmed === '' ? undefined : trimmed
}
