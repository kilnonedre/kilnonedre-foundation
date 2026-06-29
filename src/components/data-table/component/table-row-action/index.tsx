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
  // eslint-disable-next-line complexity
) => {
  const meta = props.table.options.meta as {
    toEdit?: (_id: string) => void
    toDelete?: (_id: string) => void
    toAudit?: (_id: string) => void
  }

  const edit = props.toEdit ?? meta?.toEdit
  const remove = props.toDelete ?? meta?.toDelete
  const audit = props.toAudit ?? meta?.toAudit

  if (!edit && !remove && !audit) return null

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
        {edit && (
          <>
            <DropdownMenuItem
              className="justify-center"
              onSelect={() => {
                setTimeout(() => edit(props.row.original.id), 0)
              }}
            >
              编辑
            </DropdownMenuItem>
            {(remove || audit) && <DropdownMenuSeparator />}
          </>
        )}

        {remove && (
          <>
            <DropdownMenuItem
              className="justify-center"
              onSelect={() => {
                setTimeout(() => remove(props.row.original.id), 0)
              }}
            >
              删除
            </DropdownMenuItem>
            {audit && <DropdownMenuSeparator />}
          </>
        )}

        {audit && (
          <DropdownMenuItem
            className="justify-center"
            onSelect={() => {
              setTimeout(() => audit(props.row.original.id), 0)
            }}
          >
            变更记录
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
