import { z } from 'zod'

const buildSchema = (label: string) =>
  z
    .date({
      message: `请选择${label}`,
    })
    .nullable()

export const zDateRequired = (label: string) =>
  buildSchema(label).refine((value): value is Date => value !== null, {
    message: `请选择${label}`,
  })

export const zDateOptional = (label: string) => buildSchema(label).nullish()
