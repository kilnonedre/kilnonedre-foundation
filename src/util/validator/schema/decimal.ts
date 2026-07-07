import { z } from 'zod'
import { emptyToUndefined } from '@/util/validator/empty-to-undefined'
import { DECIMAL_REGEX } from '@/util/validator/regex'

const buildSchema = (label: string, min?: number, max?: number) => {
  let schema = z
    .string({
      message: `请输入${label}`,
    })
    .trim()
    .regex(DECIMAL_REGEX, `${label}格式不正确`)

  if (min !== undefined) {
    schema = schema.refine(value => Number(value) >= min, {
      message: `${label}不能小于 ${min}`,
    })
  }

  if (max !== undefined) {
    schema = schema.refine(value => Number(value) <= max, {
      message: `${label}不能大于 ${max}`,
    })
  }

  return schema
}

export const zDecimalRequired = (label: string, min?: number, max?: number) =>
  buildSchema(label, min, max)

export const zDecimalOptional = (label: string, min?: number, max?: number) =>
  z.preprocess(emptyToUndefined, buildSchema(label, min, max).nullish())
