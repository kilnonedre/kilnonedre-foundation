import { z } from 'zod'
import { CommonLocation } from '@/type'

const buildSchema = () => z.custom<CommonLocation>().nullable()

export const zLocationRequired = (label: string) =>
  buildSchema().refine((value): value is CommonLocation => value !== null, {
    message: `请输入${label}`,
  })

export const zLocationOptional = () => buildSchema().nullish()
