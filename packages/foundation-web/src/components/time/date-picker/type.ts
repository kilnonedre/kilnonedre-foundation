import { NaiveDate } from '@kilnonedre/foundation'

export interface ConfigProp {
  id: string
  value?: NaiveDate
  disabled?: boolean
  placeholder?: string
  onChange: (_value?: NaiveDate) => void
}
