import { MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/shadcn/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import type * as types from './type'

export * from './type'

export const TableRowAction = <T extends { id: string }>(
  props: types.ConfigProp<T>
) => {
  const meta = props.table.options.meta as {
    toEdit?: (_id: string) => void
    toDelete?: (_id: string) => void
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
          size="icon"
        >
          <MoreVerticalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem
          className="justify-center"
          onSelect={() => {
            setTimeout(() => {
              ;(props.toEdit ?? meta?.toEdit)?.(props.row.original.id)
            }, 0)
          }}
        >
          编辑
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="justify-center"
          onSelect={() => {
            setTimeout(() => {
              ;(props.toDelete ?? meta?.toDelete)?.(props.row.original.id)
            }, 0)
          }}
        >
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
