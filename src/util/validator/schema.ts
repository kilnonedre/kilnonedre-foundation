import { z } from 'zod'

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

export const enumValues = <T extends Record<string, string>>(obj: T) =>
  Object.values(obj) as [T[keyof T], ...T[keyof T][]]

export const zTextOptional = (label: string, min = 1, max = 32) =>
  z
    .string()
    .trim()
    .max(max, `${label}最多 ${max} 个字符`)
    .refine(v => v === '' || v.length >= min, {
      message: `${label}至少 ${min} 个字符`,
    })

export const zTextRequired = (label: string, min = 1, max = 32) =>
  z
    .string({
      message: `请输入${label}`,
    })
    .trim()
    .min(min, `${label}至少 ${min} 个字符`)
    .max(max, `${label}最多 ${max} 个字符`)

export const zIdCard = (label = '身份证号') =>
  z
    .string({
      message: `请输入${label}`,
    })
    .trim()
    .regex(/^\d{15}$|^\d{17}(\d|X|x)$/, `${label}格式不正确`)

export const zIdCardOptional = (label = '身份证号') =>
  z.preprocess(
    value => {
      if (typeof value !== 'string') return value

      const trimmed = value.trim()
      return trimmed === '' ? undefined : trimmed
    },
    z
      .string()
      .regex(/^\d{15}$|^\d{17}(\d|X|x)$/, `${label}格式不正确`)
      .optional()
  )

export const zEmail = (max = 32) =>
  z
    .string({
      message: '请输入邮箱',
    })
    .trim()
    .email('请输入正确的邮箱')
    .max(max, `邮箱最多 ${max} 个字符`)

export const zPhone = (max = 11) =>
  z
    .string({
      message: '请输入手机号',
    })
    .trim()
    .regex(/^1[3-9]\d{9}$/, '请输入正确的手机号')
    .max(max, `手机号最多 ${max} 位`)

export const zIdRequired = (label = 'ID') =>
  z
    .string({
      message: `请选择${label}`,
    })
    .uuid(`${label}格式不正确`)

export const zIdOptional = (label = 'ID') => zIdRequired(label).optional()

export const zIdsRequired = (label = 'ID') =>
  z.array(zIdRequired(label)).min(1, `至少选择一个${label}`)

export const zIdsOptional = (label = 'ID') =>
  z.array(zIdRequired(label)).optional()

export const zTexts = (label = '内容') =>
  z.array(z.string()).min(1, `至少选择一个${label}`)

export const zImageId = (label: string) =>
  z.string().uuid(`${label} ID 格式不正确`)

export const zImageIdRequired = (label: string) =>
  z
    .string({
      message: `请至少上传一张${label}`,
    })
    .uuid(`${label} ID 格式不正确`)

export const zImageIds = (label: string) =>
  z
    .array(z.string().uuid(`${label} ID 格式不正确`))
    .min(1, `至少上传1张${label}`)

export const zImageIdsOptional = (label: string) =>
  z.array(z.string().uuid(`${label} ID 格式不正确`)).optional()

export const zEnumRequired = <T extends Record<string, string>>(
  enumObj: T,
  label: string
) =>
  z.enum(enumValues(enumObj), {
    message: `请选择${label}`,
  })

export const zEnumNullable = <T extends Record<string, string>>(
  enumObj: T,
  label: string
) =>
  z
    .enum(enumValues(enumObj), {
      message: `请选择${label}`,
    })
    .nullable()

export const zEnumNullableRequired = <T extends Record<string, string>>(
  enumObj: T,
  label: string
) =>
  z
    .enum(enumValues(enumObj), {
      message: `请选择${label}`,
    })
    .nullable()
    .refine(v => v !== null, {
      message: `请选择${label}`,
    })

export const zEnumOptional = <T extends Record<string, string>>(enumObj: T) =>
  z.enum(enumValues(enumObj)).optional()

export const zEnumNullableOptional = <T extends Record<string, string>>(
  enumObj: T
) => z.enum(enumValues(enumObj)).nullable().optional()

export const zBool = () => z.boolean()

export const zDate = (label: string) =>
  z.date({
    message: `请选择${label}`,
  })

export const zDateOptional = (label: string) =>
  z
    .date({
      message: `请选择${label}`,
    })
    .optional()

export const zNumber = (label: string, min?: number, max?: number) => {
  let schema = z.number({
    message: `请输入${label}`,
  })

  if (min !== undefined) {
    schema = schema.min(min, `${label}不能小于 ${min}`)
  }

  if (max !== undefined) {
    schema = schema.max(max, `${label}不能大于 ${max}`)
  }

  return schema
}

export const zNumberOptional = (label: string, min?: number, max?: number) => {
  let schema = z
    .number({
      message: `请输入${label}`,
    })
    .optional()

  if (min !== undefined) {
    schema = schema.refine(v => v === undefined || v >= min, {
      message: `${label}不能小于 ${min}`,
    })
  }

  if (max !== undefined) {
    schema = schema.refine(v => v === undefined || v <= max, {
      message: `${label}不能大于 ${max}`,
    })
  }

  return schema
}

export const zCoerceNumber = (label: string, min?: number, max?: number) => {
  let schema = z.coerce.number({
    message: `请输入${label}`,
  })

  if (min !== undefined) {
    schema = schema.min(min, `${label}不能小于 ${min}`)
  }

  if (max !== undefined) {
    schema = schema.max(max, `${label}不能大于 ${max}`)
  }

  return schema
}

export const zCoerceNumberOptional = (
  label: string,
  min?: number,
  max?: number
) => zCoerceNumber(label, min, max).optional()

export const zDecimal = (label: string, min?: number, max?: number) => {
  let schema = z
    .string({
      message: `请输入${label}`,
    })
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, `${label}格式不正确`)

  if (min !== undefined) {
    schema = schema.refine(v => Number(v) >= min, {
      message: `${label}不能小于 ${min}`,
    })
  }

  if (max !== undefined) {
    schema = schema.refine(v => Number(v) <= max, {
      message: `${label}不能大于 ${max}`,
    })
  }

  return schema
}

export const zDecimalOptional = (label: string, min?: number, max?: number) =>
  zDecimal(label, min, max).optional()
