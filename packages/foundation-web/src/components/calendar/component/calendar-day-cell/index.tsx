import { cn } from '@kilnonedre/foundation'
import type * as types from './type'

export const CalendarDayCell = (props: types.ConfigProp) => {
  return (
    <div
      key={props.key}
      className={cn('w-full h-full', props.className)}
      style={props.style}
      onClick={props.onClick}
    >
      <div className={cn('text-center pt-1.5', props.dayClassName)}>
        {props.day}
      </div>
    </div>
  )
}
