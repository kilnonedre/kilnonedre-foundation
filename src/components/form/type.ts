import { ReactNode } from 'react'
import { EnumFormMode } from '@/type/enum'

export interface ConfigProp {
  mode: EnumFormMode
  renderBody: () => ReactNode
  renderFooter: () => ReactNode
  onSubmit: () => void
}
