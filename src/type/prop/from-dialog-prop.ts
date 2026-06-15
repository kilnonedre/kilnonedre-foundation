import { ReactNode } from 'react'
import { EnumFormMode } from '@/type'
import { UUID } from '@/type/uuid'

export interface ConfigFormDialogProp {
  id?: UUID
  mode: EnumFormMode
  children: ReactNode
  onEdit: () => void
}
