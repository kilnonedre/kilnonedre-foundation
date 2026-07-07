import { ColumnDef } from '@tanstack/react-table'
import { TableRowAction, TableText } from '@/components'
import { buildColumn } from '@/render/column/build-column'
// import { Checkbox } from '@/shadcn/components/checkbox'
import { CommonResp } from '@/type'
import { formatDateTime } from '@/util'

export const buildCrudColumns = <T extends CommonResp>() => {
  const column = buildColumn<T>()

  return {
    columns: (
      businessColumns: ColumnDef<T>[],
      extraColumnsAfterUpdatedReason?: ColumnDef<T>[]
    ): ColumnDef<T>[] => [
      {
        id: 'id',
        header: () => null,
        cell: () => <div className="w-0.5" />,
      },
      // {
      //   id: 'select',
      //   header: ({ table }) => (
      //     <div className="flex items-center justify-center">
      //       <Checkbox
      //         checked={
      //           table.getIsAllPageRowsSelected() ||
      //           (table.getIsSomePageRowsSelected() && 'indeterminate')
      //         }
      //         onCheckedChange={value =>
      //           table.toggleAllPageRowsSelected(!!value)
      //         }
      //         aria-label="Select all"
      //       />
      //     </div>
      //   ),
      //   cell: ({ row }) => (
      //     <div className="flex items-center justify-center">
      //       <Checkbox
      //         checked={row.getIsSelected()}
      //         onCheckedChange={value => row.toggleSelected(!!value)}
      //         aria-label="Select row"
      //       />
      //     </div>
      //   ),
      //   enableSorting: false,
      //   enableHiding: false,
      // },

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

      ...(extraColumnsAfterUpdatedReason ?? []),
    ],
  }
}
