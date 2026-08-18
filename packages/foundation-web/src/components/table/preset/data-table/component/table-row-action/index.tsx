import { MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import type * as types from './type'
import { EnumVariant } from '@kilnonedre/foundation'

export * from './type'

/* eslint complexity: ["error", 30] */
export const TableRowAction = <T extends { id: string }>(
  props: types.ConfigProp<T>
) => {
  const meta = props.table.options.meta as {
    toEdit?: (_id: string) => void
    toDelete?: (_id: string) => void
    toAudit?: (_id: string) => void
    canDelete?: (_row: T, _index: number) => boolean

    rowActionMeta?: Record<
      string,
      {
        label: string
        callback: (_id: string) => void
        separator?: boolean
      }
    >
  }

  const edit = props.toEdit ?? meta?.toEdit
  const remove = props.toDelete ?? meta?.toDelete
  const audit = props.toAudit ?? meta?.toAudit
  const rowActions = meta?.rowActionMeta ?? {}

  const canDelete =
    meta?.canDelete?.(props.row.original, props.row.index) ?? true

  const showEdit = !!edit
  const showDelete = !!remove && canDelete
  const showAudit = !!audit
  const showRowActions = Object.keys(rowActions).length > 0

  if (!showEdit && !showDelete && !showAudit && !showRowActions) {
    return null
  }

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
          </>
        )}

        {showRowActions &&
          Object.entries(rowActions).map(([key, item]) => (
            <div key={key}>
              {item.separator && <DropdownMenuSeparator />}

              <DropdownMenuItem
                className="justify-center"
                onSelect={() => {
                  setTimeout(() => {
                    item.callback(props.row.original.id)
                  }, 0)
                }}
              >
                {item.label}
              </DropdownMenuItem>
            </div>
          ))}

        {showDelete && (
          <>
            {(showEdit || showRowActions) && <DropdownMenuSeparator />}

            <DropdownMenuItem
              className="justify-center"
              onSelect={() => {
                setTimeout(() => remove(props.row.original.id), 0)
              }}
            >
              删除
            </DropdownMenuItem>
          </>
        )}

        {showAudit && (
          <>
            {showDelete && <DropdownMenuSeparator />}

            <DropdownMenuItem
              className="justify-center"
              onSelect={() => {
                setTimeout(() => audit(props.row.original.id), 0)
              }}
            >
              变更记录
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
