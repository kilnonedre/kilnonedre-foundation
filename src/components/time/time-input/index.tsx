import { Input } from '@/shadcn/components/input'
import type { NaiveTime } from '@/type'
import { cn } from '@/util'
import type * as types from './type'

function normalizeTime(value: string): NaiveTime | undefined {
  if (!value) {
    return undefined
  }

  return (value.length === 5 ? `${value}:00` : value) as NaiveTime
}

export const TimeInput = ({
  value,
  onChange,
  className,
  step,
  ...props
}: types.ConfigProp) => {
  return (
    <Input
      {...props}
      type="time"
      step={step ?? 1}
      value={value ?? ''}
      onChange={event => {
        onChange(normalizeTime(event.target.value))
      }}
      className={cn(
        'appearance-none bg-background',
        '[&::-webkit-calendar-picker-indicator]:hidden',
        '[&::-webkit-calendar-picker-indicator]:appearance-none',
        className
      )}
    />
  )
}
