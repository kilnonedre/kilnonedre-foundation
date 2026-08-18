import { EnumFormMode } from '@kilnonedre/foundation'
import { ReactNode } from 'react'

export interface ConfigProp {
  mode: EnumFormMode
  renderBody: () => ReactNode
  renderFooter: () => ReactNode
  onSubmit: () => void
}
