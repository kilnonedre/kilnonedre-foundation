import type { ComponentProps } from 'react'
import type { Input } from '@/shadcn/components/input'
import { NaiveTime } from '@kilnonedre/foundation'

export interface ConfigProp extends Omit<
  ComponentProps<typeof Input>,
  'type' | 'value' | 'defaultValue' | 'onChange'
> {
  value?: NaiveTime
  onChange: (_value?: NaiveTime) => void
}
