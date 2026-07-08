import type { RowData, Table } from '@tanstack/react-table'

export interface ConfigProp<T extends RowData> {
  table: Table<T>
}
