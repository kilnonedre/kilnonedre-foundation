import type { ComponentProps } from 'react'
import type { TimeInput } from '../time-input'
import { NaiveTime } from '@kilnonedre/foundation'

export interface TimeRangeValue {
  start?: NaiveTime
  end?: NaiveTime
}

export interface ConfigProp extends Omit<
  ComponentProps<typeof TimeInput>,
  'value' | 'onChange' | 'className'
> {
  value?: TimeRangeValue
  separator?: string
  className?: string
  inputClassName?: string
  onChange: (_value?: TimeRangeValue) => void
}
