import { cn } from '@/util'
import { TimeInput } from '../time-input'
import type * as types from './type'

export const TimeRangeInput = ({
  value,
  onChange,
  separator = '至',
  className,
  inputClassName,
  ...props
}: types.ConfigProp) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <TimeInput
        {...props}
        id={`${props.id}-start`}
        value={value?.start}
        className={inputClassName}
        onChange={start => {
          onChange({
            ...value,
            start,
          })
        }}
      />

      <span className="shrink-0 text-muted-foreground">{separator}</span>

      <TimeInput
        {...props}
        id={`${props.id}-end`}
        value={value?.end}
        className={inputClassName}
        onChange={end => {
          onChange({
            ...value,
            end,
          })
        }}
      />
    </div>
  )
}
