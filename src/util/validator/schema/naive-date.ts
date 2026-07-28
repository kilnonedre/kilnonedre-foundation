import { z } from 'zod'
import { NaiveDate } from '@/type'

const buildSchema = () => z.custom<NaiveDate>().nullable()

export const zNaiveDateRequired = (label: string) =>
  buildSchema().refine((value): value is NaiveDate => value !== null, {
    message: `请输入${label}`,
  })

export const zNaiveDateOptional = () => buildSchema().nullish()
