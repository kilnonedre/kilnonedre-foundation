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
import type * as types from './type'
import {
  dateToNaiveDate,
  EnumVariant,
  naiveDateToDate,
} from '@kilnonedre/foundation'

export const DatePicker = (props: types.ConfigProp) => {
  const [open, setOpen] = React.useState(false)

  const selected = naiveDateToDate(props.value)
  const minDate = naiveDateToDate(props.minDate)
  const maxDate = naiveDateToDate(props.maxDate)

  const currentYear = new Date().getFullYear()

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
          defaultMonth={selected ?? minDate ?? new Date()}
          startMonth={minDate ?? new Date(currentYear - 50, 0)}
          endMonth={maxDate ?? new Date(currentYear + 50, 11)}
          disabled={[
            ...(minDate ? [{ before: minDate }] : []),
            ...(maxDate ? [{ after: maxDate }] : []),
          ]}
          onSelect={value => {
            props.onChange(value ? dateToNaiveDate(value) : undefined)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
