import { cn } from '@/util'
import type * as types from './type'

const TableText = (props: types.ConfigProp) => {
  return (
    <div
      className={cn(
        'text-foreground px-0 text-left',
        props.wrap
          ? 'whitespace-normal wrap-break-word'
          : 'whitespace-nowrap truncate'
      )}
    >
      {props.text ?? ''}
    </div>
  )
}

export default TableText
