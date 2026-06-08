import { ReactNode } from 'react'
import { EnumFormMode } from '@/type'

export interface ConfigProp {
  id: string
  name: string
  required?: boolean
  mode?: EnumFormMode
  label?: string
  invalid?: boolean
  error?: string
  children?: ReactNode
}
