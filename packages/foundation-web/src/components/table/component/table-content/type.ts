import type { ColumnDef, RowData, Table } from '@tanstack/react-table'

export interface ConfigProp<T extends RowData> {
  table: Table<T>
  columns: Array<ColumnDef<T>>
}
