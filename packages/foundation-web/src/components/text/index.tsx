import { cn } from '@kilnonedre/foundation'
import type * as types from './type'

export const Text = (props: types.ConfigProp) => {
  return <div className={cn('', props.className)}>{props.children}</div>
}
