import z from 'zod'
import { zTextRequired } from '@/util'

export const schema = z.object({
  updatedReason: zTextRequired('更新原因', 1, 2000),
})

export type FormValuesInput = z.input<typeof schema>
export type FormValues = z.output<typeof schema>

export const getDefaultValues = (): FormValuesInput => {
  return {
    updatedReason: '',
  }
}
