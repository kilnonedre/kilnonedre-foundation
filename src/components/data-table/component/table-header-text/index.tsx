import { cn } from '@/util'
import type * as types from './type'

export const TableHeaderText = (props: types.ConfigProp) => {
  return (
    <div
      className={cn(
        'px-0 text-left whitespace-nowrap truncate inline-block',
        props.className
      )}
    >
      {props.text}
    </div>
  )
}
