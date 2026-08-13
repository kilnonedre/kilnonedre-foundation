import { CalendarDay } from '@/components/calendar/type'
import { EnumWeek } from '@/type'
import { dateToNaiveDate } from '@/util'

export const generateCalendarDays = (
  year: number,
  month: number,
  weekStartDay: EnumWeek = EnumWeek.SUNDAY
): CalendarDay[] => {
  const result: CalendarDay[] = []

  const weekValue: Record<EnumWeek, number> = {
    [EnumWeek.SUNDAY]: 0,
    [EnumWeek.MONDAY]: 1,
    [EnumWeek.TUESDAY]: 2,
    [EnumWeek.WEDNESDAY]: 3,
    [EnumWeek.THURSDAY]: 4,
    [EnumWeek.FRIDAY]: 5,
    [EnumWeek.SATURDAY]: 6,
  }

  const weekName = Object.keys(weekValue) as EnumWeek[]

  const getWeekType = (day: number): EnumWeek => {
    return weekName.find(item => weekValue[item] === day)!
  }

  const firstDate = new Date(year, month - 1, 1)
  const lastDate = new Date(year, month, 0)

  const firstWeek = firstDate.getDay()
  const lastWeek = lastDate.getDay()

  const start = weekValue[weekStartDay]

  // 前置补位
  const prevCount = (firstWeek - start + 7) % 7

  for (let i = prevCount; i > 0; i--) {
    const date = new Date(year, month - 1, 1 - i)

    result.push({
      date: dateToNaiveDate(date),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      type: getWeekType(date.getDay()),
      isCurrentMonth: false,
    })
  }

  // 当前月
  for (let i = 1; i <= lastDate.getDate(); i++) {
    const date = new Date(year, month - 1, i)

    result.push({
      date: dateToNaiveDate(date),
      year,
      month,
      day: i,
      type: getWeekType(date.getDay()),
      isCurrentMonth: true,
    })
  }

  // 后置补位
  const end = (start + 6) % 7

  const nextCount = (end - lastWeek + 7) % 7

  for (let i = 1; i <= nextCount; i++) {
    const date = new Date(year, month, i)

    result.push({
      date: dateToNaiveDate(date),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      type: getWeekType(date.getDay()),
      isCurrentMonth: false,
    })
  }

  return result
}
