import { EnumFormMode } from '@kilnonedre/foundation'
import { ReactNode } from 'react'

export interface ConfigProp {
  id: string
  name: string
  required?: boolean
  mode?: EnumFormMode
  value?: string
  invalid?: boolean
  error?: string
  children?: ReactNode
}
