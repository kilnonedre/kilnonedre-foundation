import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import { EnumFormMode } from '@/type'

export interface ConfigRenderBase<T extends FieldValues> {
  mode?: EnumFormMode
  form: UseFormReturn<T>
  id: string
  name: FieldPath<T>
  label?: string
  showLabel?: boolean
  required?: boolean
  tip?: string
}

export interface ConfigRenderPresetBase<T extends FieldValues> {
  mode?: EnumFormMode
  form: UseFormReturn<T>
  required?: boolean
  showLabel?: boolean
  tip?: string
}
