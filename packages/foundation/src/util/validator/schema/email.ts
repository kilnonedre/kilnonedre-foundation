import { z } from 'zod'
import { emptyToUndefined } from '@/util/validator/empty-to-undefined'

const buildSchema = (max: number) =>
  z
    .string({
      message: '请输入邮箱',
    })
    .trim()
    .email('请输入正确的邮箱')
    .max(max, `邮箱最多 ${max} 个字符`)

export const zEmailRequired = (max = 32) => buildSchema(max)

export const zEmailOptional = (max = 32) =>
  z.preprocess(emptyToUndefined, buildSchema(max).nullish())
