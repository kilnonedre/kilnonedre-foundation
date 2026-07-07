import type { ReactNode } from 'react'
import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { CircleQuestionMark } from 'lucide-react'
import { TableHeaderText, TableText } from '@/components'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shadcn/components/tooltip'
import type * as types from './type'

const renderHeader = (label: string, tip?: string) => {
  if (!tip) {
    return <TableHeaderText text={label} />
  }

  return (
    <div className="flex items-center gap-1">
      <TableHeaderText text={label} />

      <Tooltip>
        <TooltipTrigger asChild>
          <CircleQuestionMark className="size-3.5 text-muted-foreground" />
        </TooltipTrigger>

        <TooltipContent side="right">
          <p className="max-w-60 text-sm">{tip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

interface AccessorColumnProp<T extends object, V> {
  key: string
  label: string
  tip?: string
  minWidth: number
  accessor: (row: T) => V
  render?: (_value: V, _row: T, _ctx: CellContext<T, unknown>) => ReactNode
}

export function buildColumn<T extends object>(): {
  <K extends keyof T>(props: types.ConfigProp<T, K>): ColumnDef<T>
  <V>(props: AccessorColumnProp<T, V>): ColumnDef<T>
}

export function buildColumn<T extends object>() {
  return <K extends keyof T, V>({
    minWidth = 120,
    ...props
  }: types.ConfigProp<T, K> | AccessorColumnProp<T, V>): ColumnDef<T> => {
    if ('accessor' in props) {
      return {
        id: props.key,
        accessorFn: props.accessor,
        minSize: minWidth,
        header: () => renderHeader(props.label, props.tip),
        cell: ctx => {
          const value = props.accessor(ctx.row.original)

          return props.render ? (
            props.render(value, ctx.row.original, ctx)
          ) : (
            <TableText text={String(value ?? '')} />
          )
        },
        meta: {
          label: props.label,
        },
      }
    }

    return {
      accessorKey: props.key as string,
      minSize: minWidth,
      header: () => renderHeader(props.label, props.tip),
      cell: ctx => {
        const value = ctx.row.original[props.key]

        return props.render ? (
          props.render(value, ctx.row.original, ctx)
        ) : (
          <TableText text={String(value ?? '')} />
        )
      },
      meta: {
        label: props.label,
      },
    }
  }
}
