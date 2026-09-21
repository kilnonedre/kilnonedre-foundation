import { EnumFormMode } from '@kilnonedre/foundation'
import { ReactNode } from 'react'

export interface ConfigProp {
  id: string
  label: string
  required?: boolean
  mode?: EnumFormMode
  value?: string | null
  invalid?: boolean
  error?: string
  children?: ReactNode
}
