import { cn } from '@/util'
import type * as types from './type'

export const Card = (props: types.ConfigProp) => {
  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col rounded-xl border bg-card p-3 text-card-foreground shadow-sm',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
