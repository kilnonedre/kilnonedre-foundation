import { FieldValues } from 'react-hook-form'
import { ConfigRenderBase } from '@/render/form/type'

export interface ConfigProp<T extends FieldValues> extends ConfigRenderBase<T> {
  onChange?: (_val: boolean) => void
}
