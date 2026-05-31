import { ColumnDef } from '@tanstack/react-table'
import { UUID } from '@/type'

export interface ConfigProp<T> {
  columns: Array<ColumnDef<T>>
  list?: Array<T>
  enableRowSelection?: boolean
  getRowId?: (_row: T) => string
  meta?: Record<string, unknown>
  navigate?: (_id: UUID) => void
}
