import { z } from 'zod'

const buildSchema = () => z.array(z.string())

export const zTextsRequired = (label: string) =>
  buildSchema().min(1, `至少选择一个${label}`)

export const zTextsOptional = () => buildSchema().optional()
