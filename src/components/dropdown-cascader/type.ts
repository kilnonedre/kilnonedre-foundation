export interface ConfigCascaderOption {
  label: string
  value: string
  disabled?: boolean
  children?: Array<ConfigCascaderOption>
}

export interface ConfigOptions {
  options: Array<ConfigCascaderOption>
}

export interface ConfigDropdownCascaderMultiProp {
  value?: Array<string>
  placeholder?: string
  onValueChange?: (
    _values: Array<string>,
    _selected: Array<{
      option: ConfigCascaderOption
      path: Array<ConfigCascaderOption>
    }>
  ) => void
}

export interface ConfigDropdownCascaderSingleProp {
  value?: string
  placeholder?: string
  onValueChange?: (
    _value: string,
    _selected: {
      option: ConfigCascaderOption
      path: Array<ConfigCascaderOption>
    }
  ) => void
}

export type ConfigDropdownCascaderMultiWithOptionsProp = ConfigOptions &
  ConfigDropdownCascaderMultiProp

export type ConfigDropdownCascaderSingleWithOptionsProp = ConfigOptions &
  ConfigDropdownCascaderSingleProp
