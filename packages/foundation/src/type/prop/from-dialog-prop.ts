import { EnumFormMode } from '@/type'
import { UUID } from '@/type/uuid'

export interface ConfigFormDialogProp {
  id?: UUID
  mode: EnumFormMode
  onEdit: () => void
  open: boolean
  onOpenChange: (_open: boolean) => void
}
