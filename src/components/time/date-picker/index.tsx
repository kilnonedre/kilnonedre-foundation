import * as React from 'react'
import { zhCN } from 'date-fns/locale'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/button'
import { Calendar } from '@/shadcn/components/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/popover'
import { EnumVariant } from '@/type'
import { dateToNaiveDate, naiveDateToDate } from '@/util'
import type * as types from './type'

export const DatePicker = (props: types.ConfigProp) => {
  const [open, setOpen] = React.useState(false)

  const selected = naiveDateToDate(props.value)
  const text = props.value ?? props.placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={props.id}
          type="button"
          variant={EnumVariant.OUTLINE}
          disabled={props.disabled}
          className="w-full justify-between font-normal"
        >
          <span className="truncate text-left">{text}</span>
          <ChevronDownIcon className="shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selected}
          locale={zhCN}
          captionLayout="dropdown"
          className="w-full"
          defaultMonth={selected}
          onSelect={value => {
            props.onChange(value ? dateToNaiveDate(value) : undefined)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
