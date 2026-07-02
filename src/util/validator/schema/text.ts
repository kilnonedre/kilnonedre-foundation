import { z } from 'zod'
import { emptyToUndefined } from '@/util/validator/empty-to-undefined'

const buildSchema = (label: string, min: number, max: number) =>
  z
    .string({
      message: `请输入${label}`,
    })
    .trim()
    .min(min, `${label}至少 ${min} 个字符`)
    .max(max, `${label}最多 ${max} 个字符`)

export const zTextRequired = (label: string, min = 1, max = 32) =>
  buildSchema(label, min, max)

export const zTextOptional = (label: string, min = 1, max = 32) =>
  z.preprocess(emptyToUndefined, buildSchema(label, min, max).nullish())
