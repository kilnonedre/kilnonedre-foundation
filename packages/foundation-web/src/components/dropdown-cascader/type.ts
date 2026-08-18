import { ReactNode } from 'react'

export interface ConfigCascaderSelected<T> {
  option: T
  path: Array<T>
}

export interface ConfigCascaderAccessor<T> {
  getValue: (_option: T) => string
  getLabel: (_option: T) => ReactNode
  getChildren?: (_option: T) => Array<T> | undefined
  getDisabled?: (_option: T) => boolean
  getShowParentInChildren?: (_option: T) => boolean
}

export interface ConfigDropdownCascaderBaseProp<
  T,
> extends ConfigCascaderAccessor<T> {
  options: Array<T>
  placeholder?: React.ReactNode
}

export interface ConfigCascaderDropdownItemRenderProp<T> {
  option: T
  selected: boolean
  depth: number
  hasChildren: boolean
}

export interface ConfigDropdownCascaderSingleValueProp<T> {
  value?: string

  onValueChange?: (
    _value: string | null,
    _selected: ConfigCascaderSelected<T> | null
  ) => void
}

export interface ConfigDropdownCascaderMultiValueProp<T> {
  value?: Array<string>

  onValueChange?: (
    _values: Array<string>,
    _selected: Array<ConfigCascaderSelected<T>>
  ) => void
}

export interface ConfigDropdownCascaderSingleProp<T>
  extends
    ConfigDropdownCascaderBaseProp<T>,
    ConfigDropdownCascaderSingleValueProp<T> {
  renderDropdownItem?: (
    _props: ConfigCascaderDropdownItemRenderProp<T>
  ) => React.ReactNode
}

export interface ConfigDropdownCascaderMultiProp<T>
  extends
    ConfigDropdownCascaderBaseProp<T>,
    ConfigDropdownCascaderMultiValueProp<T> {
  renderDropdownItem?: (
    _props: ConfigCascaderDropdownItemRenderProp<T>
  ) => React.ReactNode
}
