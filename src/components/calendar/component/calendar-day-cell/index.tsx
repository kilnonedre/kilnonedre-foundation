import { cn } from '@/util'
import type * as types from './type'

export const CalendarDayCell = (props: types.ConfigProp) => {
  return (
    <div
      key={props.key}
      className={cn('w-full h-full', props.bgColor, props.textColor)}
      style={props.style}
    >
      <div className="text-center pt-1.5">{props.day}</div>
    </div>
  )
}
