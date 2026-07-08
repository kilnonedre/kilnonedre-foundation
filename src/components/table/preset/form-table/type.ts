import type {
  FieldArray,
  FieldArrayPath,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import type { ColumnDef } from '@tanstack/react-table'

export type DeleteContext<TRow> = {
  id: string
  index: number
  row: TRow
  remove: () => void
}

export type ConfigProp<
  TFormValues extends FieldValues,
  TName extends FieldArrayPath<TFormValues>,
  TRow,
> = {
  form: UseFormReturn<TFormValues>
  name: TName
  columns: Array<ColumnDef<TRow>>
  createDefaultValue: (_index: number) => FieldArray<TFormValues, TName>
  getRowId?: (_row: TRow) => string
  onDelete?: (_ctx: DeleteContext<TRow>) => void
  canDelete?: (_row: TRow, _index: number) => boolean
  meta?: Record<string, unknown>
}
