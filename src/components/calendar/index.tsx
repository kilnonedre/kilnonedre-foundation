import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/button'
import { CalendarDayCell } from '@/components/calendar/component'
import { generateCalendarDays } from '@/components/calendar/util'
import { EnumWeek, enumWeekOptions } from '@/type'
import { cn, ymdToNaiveDate } from '@/util'
import type * as types from './type'

export * from './component'
export { CalendarDay } from './type'

export const Calendar = ({
  cellAspect = '4/3',
  ...props
}: types.ConfigProp) => {
  const startDate =
    props.dateRange && props.dateRange.start
      ? new Date(props.dateRange.start)
      : undefined

  const endDate =
    props.dateRange && props.dateRange.end
      ? new Date(props.dateRange.end)
      : undefined

  const getInitialDate = () => {
    const date = props.initDate ? new Date(props.initDate) : new Date()
    if (startDate && date < startDate) {
      return startDate
    }
    if (endDate && date > endDate) {
      return endDate
    }
    return date
  }

  const initialDate = getInitialDate()

  const [year, setYear] = useState(initialDate.getFullYear())
  const [month, setMonth] = useState(initialDate.getMonth() + 1)

  const days = generateCalendarDays(year, month, EnumWeek.SUNDAY)

  const currentMonth = new Date(year, month - 1, 1)

  const minMonth = startDate
    ? new Date(startDate.getFullYear(), startDate.getMonth(), 1)
    : undefined

  const maxMonth = endDate
    ? new Date(endDate.getFullYear(), endDate.getMonth(), 1)
    : undefined

  const canPrevMonth = !minMonth || currentMonth > minMonth

  const canNextMonth = !maxMonth || currentMonth < maxMonth

  const toPrevMonth = () => {
    if (!canPrevMonth) return

    let nextYear = year
    let nextMonth = month

    if (month === 1) {
      nextYear--
      nextMonth = 12
    } else {
      nextMonth--
    }

    setYear(nextYear)
    setMonth(nextMonth)

    emitMonthChange(nextYear, nextMonth)
  }

  const toNextMonth = () => {
    if (!canNextMonth) return

    let nextYear = year
    let nextMonth = month

    if (month === 12) {
      nextYear++
      nextMonth = 1
    } else {
      nextMonth++
    }

    setYear(nextYear)
    setMonth(nextMonth)

    emitMonthChange(nextYear, nextMonth)
  }

  const emitMonthChange = (year: number, month: number) => {
    const date = ymdToNaiveDate(year, month)
    props.onMonthChange?.(year, month, date)
  }

  const isOutOfRange = (day: { year: number; month: number; day: number }) => {
    if (!startDate || !endDate) {
      return false
    }

    const date = new Date(day.year, day.month - 1, day.day)

    return date < startDate || date > endDate
  }

  const renderCell = (day: types.CalendarDay, outOfRange: boolean) => {
    if (outOfRange) {
      return (
        props.renderOutRangeDayCell?.(day) ?? (
          <CalendarDayCell bgColor={outOfRange && 'bg-muted'} day={''} />
        )
      )
    } else if (!day.isCurrentMonth) {
      return (
        props.renderOtherMonthDayCell?.(day) ?? (
          <CalendarDayCell
            textColor={'text-muted-foreground/50'}
            day={`${day.day}日`}
          />
        )
      )
    } else {
      return (
        props.renderDayCell?.(day) ?? <CalendarDayCell day={`${day.day}日`} />
      )
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 items-center mb-2">
        <div className="flex gap-2">
          <Button disabled={!canPrevMonth} onClick={toPrevMonth}>
            <ChevronLeft />
          </Button>

          <Button disabled={!canNextMonth} onClick={toNextMonth}>
            <ChevronRight />
          </Button>

          <Button>今天</Button>
        </div>

        <div className="justify-self-center font-bold text-xl">
          {year}年{month}月
        </div>

        <div className="justify-self-end">
          <button className="rounded border px-3 py-1">月</button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-7">
          {enumWeekOptions.map(week => (
            <div key={week.value} className="border-r py-2 last:border-r-0">
              <div className="text-center">{week.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map(day => {
            const outOfRange = isOutOfRange(day)

            return (
              <div
                key={`${day.year}-${day.month}-${day.day}`}
                className={cn('border-r border-t nth-[7n]:border-r-0')}
                style={{
                  aspectRatio: cellAspect,
                }}
                onClick={() => {
                  if (outOfRange || !day.isCurrentMonth) {
                    return
                  }
                  props.onDayClick?.(day)
                }}
              >
                {renderCell(day, outOfRange)}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
