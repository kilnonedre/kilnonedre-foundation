import { ReactNode } from 'react'
import { EnumSemanticColor, EnumVariant } from '@/type/enum'

export interface ConfigProp {
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
