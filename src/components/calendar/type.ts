import { ReactNode } from 'react'
import { EnumWeek, NaiveDate } from '@/type'

export interface CalendarDay {
  date: NaiveDate
  year: number
  month: number
  day: number
  type: EnumWeek
  isCurrentMonth: boolean
}

export interface ConfigProp {
  cellAspect?: string
  initDate?: NaiveDate
  dateRange?: {
    start?: NaiveDate
    end?: NaiveDate
  }
  onDayClick?: (_day: CalendarDay) => void
  renderDayCell?: (_day: CalendarDay) => ReactNode
  renderOutRangeDayCell?: (_day: CalendarDay) => ReactNode
  renderOtherMonthDayCell?: (_day: CalendarDay) => ReactNode
  onMonthChange?: (_year: number, _month: number, _date: NaiveDate) => void
}
