import { cn } from '@/util'
import type * as types from './type'

const TableHeaderText = (props: types.ConfigProp) => {
  return (
    <div
      className={cn(
        'px-0 text-left whitespace-nowrap truncate',
        props.className
      )}
    >
      {props.text}
    </div>
  )
}

export default TableHeaderText
