import dayjs from 'dayjs'

export const formatDateTime = (
  value: string | Date | number | null | undefined,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  if (!value) return ''
  return dayjs(value).format(format)
}
