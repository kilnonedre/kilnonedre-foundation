import { z } from 'zod'
import { toNumber } from '@/util/to-number'

const buildSchema = (label: string, min?: number, max?: number) => {
  let schema = z
    .number({
      error: `${label}不能为空`,
    })
    .finite(`${label}必须是有效数字`)

  if (min !== undefined) {
    schema = schema.min(min, `${label}不能小于${min}`)
  }

  if (max !== undefined) {
    schema = schema.max(max, `${label}不能大于${max}`)
  }

  return schema
}

export const zNumberRequired = (label: string, min?: number, max?: number) =>
  z.preprocess(toNumber, buildSchema(label, min, max))

export const zNumberOptional = (label: string, min?: number, max?: number) =>
  z.preprocess(toNumber, buildSchema(label, min, max).optional())
