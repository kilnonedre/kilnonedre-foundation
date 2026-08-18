import { EnumFormMode } from '@kilnonedre/foundation'
import { ReactNode } from 'react'

export interface ConfigProp {
  id?: string
  mode: EnumFormMode
  open: boolean
  bodyHeight?: string | number
  limitHeight?: boolean
  onEdit: () => void
  renderBody: () => ReactNode
  renderFooter: () => ReactNode
  onSubmit: () => void
  onOpenChange: (_nextOpen: boolean) => void
}
