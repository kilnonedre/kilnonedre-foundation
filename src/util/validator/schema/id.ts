import { z } from 'zod'
import { UUID } from '@/type'
import { emptyToUndefined } from '@/util/validator/empty-to-undefined'

const buildSchema = (label: string) =>
  z
    .string({
      message: `请选择${label}`,
    })
    .uuid(`${label}格式不正确`)
    .transform(value => value as UUID)

export const zIdRequired = (label: string) => buildSchema(label)

export const zIdOptional = (label: string) =>
  z.preprocess(emptyToUndefined, buildSchema(label).optional())

export const zIdsRequired = (label: string) =>
  z.array(buildSchema(label)).min(1, `至少选择一个${label}`)

export const zIdsOptional = (label: string) =>
  z.array(buildSchema(label)).optional()
