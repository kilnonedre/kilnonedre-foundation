import { ConfigFormPlainBase } from '@/render/form-plain/type'
import { CommonOption } from '@/type'

export interface ConfigProp extends ConfigFormPlainBase {
  value: string
  options: Array<CommonOption>
  onChange: (_val: string) => void
  onLabelChange?: (_label: string) => void
}
