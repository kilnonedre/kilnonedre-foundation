import { z } from 'zod'

const enumValues = <T extends Record<string, string>>(obj: T) =>
  Object.values(obj) as [T[keyof T], ...T[keyof T][]]

const buildSchema = <T extends Record<string, string>>(
  enumObj: T,
  label: string
) =>
  z
    .enum(enumValues(enumObj), {
      message: `请选择${label}`,
    })
    .nullable()

export const zEnumRequired = <T extends Record<string, string>>(
  enumObj: T,
  label: string
) =>
  buildSchema(enumObj, label).refine(
    (value): value is T[keyof T] => value !== null,
    {
      message: `请选择${label}`,
    }
  )

export const zEnumOptional = <T extends Record<string, string>>(
  enumObj: T,
  label: string
) => buildSchema(enumObj, label)
