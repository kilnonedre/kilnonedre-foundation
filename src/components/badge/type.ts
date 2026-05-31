import { ReactNode } from 'react'
import { EnumSemanticColor, EnumVariant } from '@/type/enum'

export interface ConfigProp {
  semanticColor?: EnumSemanticColor
  variant?: EnumVariant
  children?: ReactNode
  className?: string
}
