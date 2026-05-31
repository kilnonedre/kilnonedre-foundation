export interface ConfigProp {
  value?: Date
  onChange: (_value?: Date) => void
  id?: string
  disabled?: boolean
  datePlaceholder?: string
  timePlaceholder?: string
}
