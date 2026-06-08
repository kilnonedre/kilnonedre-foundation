import { ReactNode } from 'react'
import { ConfigCascaderOption } from '@/components'
import { EnumFormMode } from '@/type'

export interface ConfigFormPlainBase {
  id: string
  name: string
  required?: boolean
  mode?: EnumFormMode
  label?: string
  invalid?: boolean
  error?: string
  children?: ReactNode
}

export interface ConfigFromPlainEnumSelect extends ConfigFormPlainBase {
  value: string
  onChange: (_val: string) => void
  onLabelChange?: (_label: string) => void
}

export interface ConfigFormPlainMultiSelect extends ConfigFormPlainBase {
  value: Array<string>
  onChange?: (
    _values: Array<string>,
    _selected: Array<{
      option: ConfigCascaderOption
      path: Array<ConfigCascaderOption>
    }>
  ) => void
}
