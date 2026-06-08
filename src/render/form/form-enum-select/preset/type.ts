import { FieldValues } from 'react-hook-form'
import { ConfigRenderBase } from '@/render/form/type'

export interface ConfigFormEnumSelect<
  T extends FieldValues,
> extends ConfigRenderBase<T> {
  onChange?: (_val: string) => void
  onLabelChange?: (_label: string) => void
}
