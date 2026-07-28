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
import type { NaiveDate } from '@/type'
import { EnumVariant } from '@/type'
import { padStartNumber } from '@/util'
import type * as types from './type'

function dateToNaiveDate(value: Date): NaiveDate {
  const year = value.getFullYear()
  const month = padStartNumber(value.getMonth() + 1)
  const day = padStartNumber(value.getDate())

  return `${year}-${month}-${day}` as NaiveDate
}

function naiveDateToDate(value?: NaiveDate): Date | undefined {
  if (!value) {
    return undefined
  }

  const [year, month, day] = value.split('-').map(Number)

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return undefined
  }

  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined
  }

  return date
}

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
