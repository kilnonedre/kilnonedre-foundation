import { ReactNode } from 'react'
import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form'
import { EnumFormMode } from '@/type'

export interface ConfigProp {
  id: string
  name: string
  required?: boolean
  tip?: string
  control: Control<FieldValues>
  mode?: EnumFormMode
  label?: string
  children: (_params: {
    field: ControllerRenderProps<FieldValues, string>
    fieldState: ControllerFieldState
    id: string
  }) => ReactNode
}
