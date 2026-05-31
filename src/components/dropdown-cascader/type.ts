export interface ConfigCascaderOption {
  label: string
  value: string
  disabled?: boolean
  children?: Array<ConfigCascaderOption>
}

export interface ConfigDropdownCascaderMultiProp {
  options: Array<ConfigCascaderOption>
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
  options: Array<ConfigCascaderOption>
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
