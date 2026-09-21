import { EnumFormMode } from '@kilnonedre/foundation'
import { ReactNode } from 'react'

export interface ConfigFormPlainBase {
  id: string
  label: string
  required?: boolean
  mode?: EnumFormMode
  invalid?: boolean
  error?: string
  children?: ReactNode
}

export interface ConfigFromPlainEnumSelect extends ConfigFormPlainBase {
  value: string
  onChange: (_val: string) => void
  onLabelChange?: (_label: string) => void
}
