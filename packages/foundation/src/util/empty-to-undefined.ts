/**
 * 将空字符串转换为 undefined。
 *
 * 常用于 Zod 的 preprocess 场景，避免用户输入空字符串时被视为有效值。
 *
 * 示例：
 * - '' => undefined
 * - '   ' => undefined
 * - 'hello' => 'hello'
 * - null => undefined
 * - 123 => undefined
 *
 * @param value 待处理的值
 * @returns 去除首尾空格后的字符串，若为空则返回 undefined
 */
export const emptyToUndefined = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined
  }

  const v = value.trim()
  return v || undefined
}
