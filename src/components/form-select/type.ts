import { CommonOption } from '@/type'

export interface ConfigProp {
  value: string
  onValueChange: (_val: string) => void
  onLabelChange?: (_val: string) => void
  invalid: boolean
  optionList: Array<CommonOption>
}
