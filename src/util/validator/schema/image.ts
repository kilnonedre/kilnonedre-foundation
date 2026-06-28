import { z } from 'zod'
import type { UUID } from '@/type/uuid'

const buildSchema = (label: string) =>
  z
    .string({
      message: `请上传${label}`,
    })
    .uuid(`${label} ID 格式不正确`)
    .transform(value => value as UUID)

export const zImageIdRequired = (label: string) => buildSchema(label)

export const zImageIdOptional = (label: string) => buildSchema(label).nullable()

export const zImageIdsRequired = (label: string) =>
  z.array(buildSchema(label)).min(1, `至少上传1张${label}`)

export const zImageIdsOptional = (label: string) =>
  z.array(buildSchema(label)).optional()
