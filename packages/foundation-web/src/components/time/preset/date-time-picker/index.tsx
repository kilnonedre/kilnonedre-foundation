import { DatePicker } from '@/components/time/date-picker'
import { TimeInput } from '@/components/time/time-input'
import { Field, FieldGroup } from '@/shadcn/components/field'
import type * as types from './type'
import { NaiveDate, NaiveTime, padStartNumber } from '@kilnonedre/foundation'

function formatDate(value?: Date | string): NaiveDate | undefined {
  if (!value) {
    return undefined
  }

  const date = typeof value === 'string' ? new Date(value) : value

  if (Number.isNaN(date.getTime())) {
    return undefined
  }

  return `${date.getFullYear()}-${padStartNumber(date.getMonth() + 1)}-${padStartNumber(
    date.getDate()
  )}` as NaiveDate
}

function formatTime(value?: Date | string): NaiveTime | undefined {
  if (!value) {
    return undefined
  }

  const date = typeof value === 'string' ? new Date(value) : value

  if (Number.isNaN(date.getTime())) {
    return undefined
  }

  return `${padStartNumber(date.getHours())}:${padStartNumber(date.getMinutes())}:${padStartNumber(
    date.getSeconds()
  )}` as NaiveTime
}

function parseNaiveDate(value: NaiveDate): Date | undefined {
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

function mergeDateAndTime(date: NaiveDate, time?: NaiveTime): Date | undefined {
  const result = parseNaiveDate(date)

  if (!result) {
    return undefined
  }

  const [hour = '0', minute = '0', second = '0'] = (time ?? '00:00:00').split(
    ':'
  )

  result.setHours(Number(hour), Number(minute), Number(second), 0)

  return result
}

export const DateTimePicker = (props: types.ConfigProp) => {
  const date = formatDate(props.value)
  const time = formatTime(props.value)

  return (
    <FieldGroup className="flex-row gap-2.5">
      <Field>
        <DatePicker
          id={`${props.id}-date`}
          disabled={props.disabled}
          value={date}
          placeholder={props.datePlaceholder}
          onChange={nextDate => {
            if (!nextDate) {
              props.onChange(undefined)
              return
            }

            props.onChange(mergeDateAndTime(nextDate, time))
          }}
        />
      </Field>

      <TimeInput
        id={`${props.id}-time`}
        disabled={props.disabled || !date}
        value={time}
        className="w-32"
        placeholder={props.timePlaceholder}
        onChange={nextTime => {
          if (!date) {
            return
          }

          props.onChange(mergeDateAndTime(date, nextTime))
        }}
      />
    </FieldGroup>
  )
}
