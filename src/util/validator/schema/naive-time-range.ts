import { z } from 'zod'
import type { NaiveTime } from '@/type'

export interface NaiveTimeRange {
  start: NaiveTime
  end: NaiveTime
}

const buildSchema = () =>
  z
    .custom<NaiveTimeRange>()
    .nullable()
    .refine(value => value === null || (!!value.start && !!value.end), {
      message: '开始时间和结束时间不能为空',
    })
    .refine(value => value === null || value.end > value.start, {
      message: '结束时间必须晚于开始时间',
    })

export const zNaiveTimeRangeRequired = (label: string) =>
  buildSchema().refine((value): value is NaiveTimeRange => value !== null, {
    message: `请输入${label}`,
  })

export const zNaiveTimeRangeOptional = () => buildSchema().nullish()
