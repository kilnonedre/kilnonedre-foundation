import { z } from 'zod'
import { NaiveTime } from '@/type'

const buildSchema = () => z.custom<NaiveTime>().nullable()

export const zNaiveTimeRequired = (label: string) =>
  buildSchema().refine((value): value is NaiveTime => value !== null, {
    message: `请输入${label}`,
  })

export const zNaiveTimeOptional = () => buildSchema().nullish()
