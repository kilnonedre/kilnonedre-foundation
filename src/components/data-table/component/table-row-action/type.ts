import { Row, Table } from '@tanstack/react-table'
import { EnumFormMode, UUID } from '@/type'

export interface ConfigProp<T> {
  row: Row<T>
  table: Table<T>
  toEdit?: (_id: string) => void
  toDelete?: (_id: string) => void
  toAudit?: (_id: string) => void
}

export interface FormDialogState {
  mode: EnumFormMode
  id?: UUID
}
