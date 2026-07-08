import { flexRender, RowData } from '@tanstack/react-table'
import { TableEmpty } from '@/components/table/preset'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/table'
import type * as types from './type'

export const TableContent = <T extends RowData>(props: types.ConfigProp<T>) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 bg-muted">
        {props.table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  minWidth: header.column.columnDef.minSize,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {props.table.getRowModel().rows.length > 0 ? (
          props.table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  style={{
                    minWidth: cell.column.columnDef.minSize,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={props.columns.length}
              className="h-24 text-center"
            >
              <TableEmpty />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
