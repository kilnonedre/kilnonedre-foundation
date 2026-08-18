import { CommonOption } from '@kilnonedre/foundation'

export interface ConfigProp {
  value: string
  onValueChange: (_val: string) => void
  onLabelChange?: (_val: string) => void
  invalid: boolean
  optionList: Array<CommonOption>
}
