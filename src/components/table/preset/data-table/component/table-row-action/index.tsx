import { MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import { EnumVariant } from '@/type'
import type * as types from './type'

export * from './type'

/* eslint complexity: ["error", 20] */
export const TableRowAction = <T extends { id: string }>(
  props: types.ConfigProp<T>
) => {
  const meta = props.table.options.meta as {
    toEdit?: (_id: string) => void
    toDelete?: (_id: string) => void
    toAudit?: (_id: string) => void
    canDelete?: (_row: T, _index: number) => boolean
  }

  const edit = props.toEdit ?? meta?.toEdit
  const remove = props.toDelete ?? meta?.toDelete
  const audit = props.toAudit ?? meta?.toAudit

  const canDelete =
    meta?.canDelete?.(props.row.original, props.row.index) ?? true

  const showEdit = !!edit
  const showDelete = !!remove && canDelete
  const showAudit = !!audit

  if (!showEdit && !showDelete && !showAudit) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={EnumVariant.GHOST}
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
        >
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        {showEdit && (
          <>
            <DropdownMenuItem
              className="justify-center"
              onSelect={() => {
                setTimeout(() => edit(props.row.original.id), 0)
              }}
            >
              编辑
            </DropdownMenuItem>
            {(showDelete || showAudit) && <DropdownMenuSeparator />}
          </>
        )}

        {showDelete && (
          <>
            <DropdownMenuItem
              className="justify-center"
              onSelect={() => {
                setTimeout(() => remove(props.row.original.id), 0)
              }}
            >
              删除
            </DropdownMenuItem>
            {showAudit && <DropdownMenuSeparator />}
          </>
        )}

        {showAudit && (
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
