import { UUID } from '@/type/uuid'

export interface ConfigDialogProp {
  id: UUID
  open: boolean
  onOpenChange: (_open: boolean) => void
}
