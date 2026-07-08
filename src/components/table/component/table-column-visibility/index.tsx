import { RowData } from '@tanstack/react-table'
import { ChevronDownIcon, ColumnsIcon } from 'lucide-react'
import { Button } from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import { EnumVariant } from '@/type'
import type * as types from './type'

export const TableColumnVisibility = <T extends RowData>(
  props: types.ConfigProp<T>
) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={EnumVariant.OUTLINE} size="sm">
          <ColumnsIcon />
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {props.table
          .getAllColumns()
          .filter(
            column =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map(column => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={value => column.toggleVisibility(!!value)}
            >
              {String(column.columnDef.meta?.label ?? '')}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
