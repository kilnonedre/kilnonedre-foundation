import { enumToOptions } from '@/util'

// 星期
export const EnumWeek = {
  SUNDAY: 'SUNDAY',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
} as const

export type EnumWeek = (typeof EnumWeek)[keyof typeof EnumWeek]

export const EnumWeekLabel: Record<EnumWeek, string> = {
  SUNDAY: '周日',
  MONDAY: '周一',
  TUESDAY: '周二',
  WEDNESDAY: '周三',
  THURSDAY: '周四',
  FRIDAY: '周五',
  SATURDAY: '周六',
}

export const enumWeekOptions = enumToOptions(EnumWeek, EnumWeekLabel)
