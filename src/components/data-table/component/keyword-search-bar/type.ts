export interface ConfigProps {
  value?: string
  placeholder?: string
  widthClassName?: string
  onChange: (_value: string) => void
  onSearch: () => void
}
