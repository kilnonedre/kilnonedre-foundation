import { ReactNode } from 'react'

export interface ConfigProp {
  id?: string
  name: string
  value?: string | number | null
  placeholder?: string
  required?: boolean
  render?: ReactNode
}
