import { EnumSemanticColor, EnumVariant } from '@kilnonedre/foundation'
import { ReactNode } from 'react'

export interface ConfigProp {
  semanticColor?: EnumSemanticColor
  variant?: EnumVariant
  children?: ReactNode
  className?: string
}
