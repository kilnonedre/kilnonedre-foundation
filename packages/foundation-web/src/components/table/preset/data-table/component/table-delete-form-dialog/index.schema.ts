import { zTextAreaRequired } from '@kilnonedre/foundation'
import z from 'zod'

export const schema = z.object({
  updatedReason: zTextAreaRequired('更新原因'),
})

export type FormValuesInput = z.input<typeof schema>
export type FormValues = z.output<typeof schema>

export const getDefaultValues = (): FormValuesInput => {
  return {
    updatedReason: '',
  }
}
