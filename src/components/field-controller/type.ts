import { ReactNode } from 'react'
import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { EnumFormMode } from '@/type'

export interface ConfigProp<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
> {
  id: string
  name: TName
  label?: string
  showLabel?: boolean
  required?: boolean
  tip?: string
  control: Control<T>
  mode?: EnumFormMode
  children: (_params: {
    field: ControllerRenderProps<T, FieldPath<T>>
    fieldState: ControllerFieldState
    id: string
  }) => ReactNode
}
