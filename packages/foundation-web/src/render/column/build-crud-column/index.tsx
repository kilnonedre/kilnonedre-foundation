import { ColumnDef } from '@tanstack/react-table'
import { CommonResp, formatDateTime } from '@kilnonedre/foundation'
import { TableRowAction, TableText } from '@/components/table/preset'
import { buildColumn } from '@/render/column/build-column'
import { Checkbox } from '@/shadcn/components/checkbox'

export const buildCrudColumns = <T extends CommonResp>() => {
  const column = buildColumn<T>()

  const selectColumn: ColumnDef<T> = {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }

  return {
    columns: (
      businessColumns: Array<ColumnDef<T>>,
      selectable = false,
      extraColumnsAfterUpdatedReason?: Array<ColumnDef<T>>
    ): Array<ColumnDef<T>> => [
      {
        id: 'id',
        header: () => null,
        cell: () => <div className="w-0.5" />,
      },

      ...(selectable ? Array.of(selectColumn) : Array<ColumnDef<T>>()),

      ...businessColumns,

      column({
        key: 'createdBy',
        label: '创建人',
        render: value => <TableText text={value?.username} />,
      }),
      column({
        key: 'createdAt',
        label: '创建时间',
        render: value => <TableText text={formatDateTime(value)} />,
      }),
      column({
        key: 'updatedBy',
        label: '更新人',
        render: value => <TableText text={value?.username} />,
      }),
      column({
        key: 'updatedAt',
        label: '更新时间',
        render: value => <TableText text={formatDateTime(value)} />,
      }),
      column({
        key: 'updatedReason',
        label: '更新原因',
      }),
      {
        id: 'crud-actions',
        cell: ({ row, table }) => <TableRowAction row={row} table={table} />,
      },

      ...(extraColumnsAfterUpdatedReason ?? Array<ColumnDef<T>>()),
    ],
  }
}
