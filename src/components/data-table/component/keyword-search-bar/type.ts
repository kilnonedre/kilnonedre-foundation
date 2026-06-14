export interface ConfigProp {
  value?: string
  placeholder?: string
  widthClassName?: string
  onChange: (_value: string) => void
  onSearch: () => void
}
