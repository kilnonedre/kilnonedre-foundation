import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import { EnumFormMode } from '@/type'

export interface ConfigRenderBase<T extends FieldValues> {
  mode?: EnumFormMode
  form: UseFormReturn<T>
  id: string
  name: FieldPath<T>
  label: string
  required?: boolean
  tip?: string
}

export interface ConfigRenderPasswordInput<
  T extends FieldValues,
> extends ConfigRenderBase<T> {
  hidden: boolean
  onHiddenChange: (_hidden: boolean) => void
}
