import { FieldValues } from 'react-hook-form'
import { ConfigRenderBase } from '@/render/form/type'
import { CommonOption } from '@kilnonedre/foundation'

export interface ConfigProp<T extends FieldValues> extends ConfigRenderBase<T> {
  options: Array<CommonOption>
  onChange?: (_val: string) => void
}
