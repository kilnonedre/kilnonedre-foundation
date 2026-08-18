import { EnumSemanticColor, EnumVariant } from '@kilnonedre/foundation'
import { ReactNode } from 'react'

export interface ConfigProp {
  id?: string
  semanticColor?: EnumSemanticColor
  variant?: EnumVariant
  children?: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon' | null
  type?: 'button' | 'submit' | 'reset'
}
