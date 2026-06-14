import type { ReactNode } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TableHeaderText, TableText } from '@/components'
import type * as types from './type'

interface AccessorColumnProp<T extends object, V> {
  key: string
  label: string
  accessor: (row: T) => V
  render?: (value: V, row: T) => ReactNode
}

export function buildColumn<T extends object>(): {
  <K extends keyof T>(props: types.ConfigProp<T, K>): ColumnDef<T>
  <V>(props: AccessorColumnProp<T, V>): ColumnDef<T>
}

export function buildColumn<T extends object>() {
  return <K extends keyof T, V>(
    props: types.ConfigProp<T, K> | AccessorColumnProp<T, V>
  ): ColumnDef<T> => {
    if ('accessor' in props) {
      return {
        id: props.key,
        accessorFn: props.accessor,
        header: () => <TableHeaderText text={props.label} />,
        cell: ({ row }) => {
          const value = props.accessor(row.original)

          return props.render ? (
            props.render(value, row.original)
          ) : (
            <TableText text={String(value ?? '')} />
          )
        },
        meta: {
          label: props.label,
        },
      }
    }

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
}
