import * as React from 'react'
import { zhCN } from 'date-fns/locale'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/shadcn/components/button'
import { Calendar } from '@/shadcn/components/calendar'
import { Field, FieldGroup } from '@/shadcn/components/field'
import { Input } from '@/shadcn/components/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/popover'
import { formatDateTime } from '@/util'
import type * as types from './type'

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function formatTimeHHmmss(d?: Date | string) {
  if (!d) return ''

  const date = typeof d === 'string' ? new Date(d) : d

  if (isNaN(date.getTime())) return ''

  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`
}

function mergeDateAndTime(datePart: Date, timeHHmmss: string) {
  const [hh = '0', mm = '0', ss = '0'] = timeHHmmss.split(':')
  const d = new Date(datePart)
  d.setHours(Number(hh), Number(mm), Number(ss), 0)
  return d
}

export const TimePicker = (props: types.ConfigProp) => {
  const [open, setOpen] = React.useState(false)

  const dateBtnText = props.value
    ? formatDateTime(props.value, 'YYYY-MM-DD')
    : props.datePlaceholder
  const timeValue = formatTimeHHmmss(props.value)

  return (
    <FieldGroup className="flex-row gap-2.5">
      <Field>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={`${props.id}-date`}
              type="button"
              disabled={props.disabled}
              className="w-32 justify-between font-normal"
            >
              <div className="w-full text-left">{dateBtnText}</div>
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0"
            align="start"
          >
            <Calendar
              mode="single"
              selected={props.value}
              locale={zhCN}
              captionLayout="dropdown"
              className="w-full"
              defaultMonth={props.value}
              onSelect={picked => {
                if (!picked) {
                  props.onChange(undefined)
                  setOpen(false)
                  return
                }

                const next = props.value
                  ? mergeDateAndTime(picked, formatTimeHHmmss(props.value))
                  : mergeDateAndTime(picked, '00:00:00')

                props.onChange(next)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>

      <Field className="w-32">
        <Input
          type="time"
          step="1"
          id={`${props.id}-time`}
          disabled={props.disabled || !props.value}
          value={timeValue}
          placeholder={props.timePlaceholder}
          onChange={e => {
            const t = e.target.value
            const time = t.length === 5 ? `${t}:00` : t
            if (!props.value) return
            props.onChange(mergeDateAndTime(props.value, time))
          }}
          className="appearance-none bg-background
                     [&::-webkit-calendar-picker-indicator]:hidden
                     [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  )
}
