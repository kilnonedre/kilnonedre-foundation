import { cn } from '@/util'
import type * as types from './type'

export const FieldGroup = (props: types.ConfigProp) => {
  return (
    <div
      className={cn(
        'grid lg:grid-cols-2 gap-4 sm:grid-cols-1 xl:grid-cols-3',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
