import { useState } from 'react'
import { FieldArrayPath, FieldValues, useFieldArray } from 'react-hook-form'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import {
  TableColumnVisibility,
  TableContent,
} from '@/components/table/component'
import { TableAddButton } from '@/components/table/preset/data-table'
import type * as types from './type'

export const FormTable = <
  TFormValues extends FieldValues,
  TName extends FieldArrayPath<TFormValues>,
  TRow,
>(
  props: types.ConfigProp<TFormValues, TName, TRow>
) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const { fields, append, remove } = useFieldArray({
    control: props.form.control,
    name: props.name,
  })

  const table = useReactTable({
    data: fields as unknown as Array<TRow>,
    columns: props.columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    meta: {
      ...props.meta,
      form: props.form,
      append,
      toDelete: (id: string) => {
        const index = fields.findIndex(field => field.id === id)
        if (index < 0) return
        const removeCurrent = () => {
          remove(index)
        }
        if (props.onDelete) {
          props.onDelete({
            id,
            index,
            row: fields[index] as unknown as TRow,
            remove: removeCurrent,
          })
          return
        }
        removeCurrent()
      },
      canDelete: (row: TRow, index: number) => {
        return props.canDelete?.(row, index) ?? true
      },
      name: props.name,
    },
    getRowId: props.getRowId
      ? row => props.getRowId!(row)
      : (_row, index) => index.toString(),
    enableRowSelection: true,
    onRowSelectionChange: updater =>
      setRowSelection(prev =>
        typeof updater === 'function' ? updater(prev) : updater
      ),
    onSortingChange: updater =>
      setSorting(prev =>
        typeof updater === 'function' ? updater(prev) : updater
      ),
    onColumnVisibilityChange: updater =>
      setColumnVisibility(prev =>
        typeof updater === 'function' ? updater(prev) : updater
      ),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="ml-auto flex items-center gap-2">
          <TableColumnVisibility table={table} />

          <TableAddButton
            onClick={() => {
              append(props.createDefaultValue(fields.length))
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-auto pb-0.5">
        <div className="overflow-hidden rounded-lg border">
          <TableContent table={table} columns={props.columns} />
        </div>
      </div>
    </div>
  )
}
