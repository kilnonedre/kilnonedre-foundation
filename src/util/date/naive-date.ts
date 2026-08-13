import { NaiveDate } from '@/type'
import { padStartNumber } from '@/util/pad-start-number'

export const dateToNaiveDate = (value: Date): NaiveDate => {
  const year = value.getFullYear()
  const month = padStartNumber(value.getMonth() + 1)
  const day = padStartNumber(value.getDate())

  return `${year}-${month}-${day}` as NaiveDate
}

export const naiveDateToDate = (value?: NaiveDate): Date | undefined => {
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

export const ymdToNaiveDate = (
  year: number,
  month: number = 1,
  day: number = 1
): NaiveDate => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` as NaiveDate
}
