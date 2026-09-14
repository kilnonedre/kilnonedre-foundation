import { NaiveDate } from '@kilnonedre/foundation'

export interface ConfigProp {
  id: string
  value?: NaiveDate
  disabled?: boolean
  placeholder?: string
  minDate?: NaiveDate
  maxDate?: NaiveDate
  onChange: (_value?: NaiveDate) => void
}
