import { FieldValues } from 'react-hook-form'
import { ConfigRenderBase } from '@/render/form/type'
import { CommonOption } from '@/type'

export interface ConfigProp<T extends FieldValues> extends ConfigRenderBase<T> {
  options: Array<CommonOption>
  onChange?: (_val: string) => void
  onLabelChange?: (_label: string) => void
}
