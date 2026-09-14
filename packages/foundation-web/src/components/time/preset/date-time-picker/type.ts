export interface ConfigProp {
  value?: Date
  onChange: (_value?: Date) => void
  id?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  datePlaceholder?: string
  timePlaceholder?: string

  timeClassName?: string
}
