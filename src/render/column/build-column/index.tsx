import { ColumnDef } from '@tanstack/react-table'
import { TableHeaderText, TableText } from '@/components'
import type * as types from './type'

export const buildColumn = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  props: types.ConfigProp<T, K>
): ColumnDef<T> => {
  const { key, label, render } = props

  return {
    accessorKey: key as string,
    header: () => <TableHeaderText text={label} />,
    cell: ({ row }) => {
      const value = row.original[key]

      return render ? (
        render(value, row.original)
      ) : (
        <TableText text={String(value ?? '')} />
      )
    },
    meta: {
      label,
    },
  }
}
