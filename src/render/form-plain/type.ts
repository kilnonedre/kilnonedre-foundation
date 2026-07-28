import { ReactNode } from 'react'
import { EnumFormMode } from '@/type'

export interface ConfigFormPlainBase {
  id: string
  name: string
  required?: boolean
  mode?: EnumFormMode
  label?: string
  invalid?: boolean
  error?: string
  children?: ReactNode
}

export interface ConfigFromPlainEnumSelect extends ConfigFormPlainBase {
  value: string
  onChange: (_val: string) => void
  onLabelChange?: (_label: string) => void
}
