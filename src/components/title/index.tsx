import { cn } from '@/util'
import type * as types from './type'

export const Title = (props: types.ConfigProp) => {
  return (
    <div className={cn('text-lg font-bold', props.className)}>
      {props.children}
    </div>
  )
}
