import { cn } from '@/util'
import type * as types from './type'

export const FieldGroup = ({
  singleColumn = false,
  ...props
}: types.ConfigProp) => {
  return (
    <div
      className={cn(
        'grid gap-4',
        singleColumn
          ? 'grid-cols-1'
          : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
