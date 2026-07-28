import { NaiveDate } from '@/type'

export interface ConfigProp {
  id: string
  value?: NaiveDate
  disabled?: boolean
  placeholder?: string
  onChange: (_value?: NaiveDate) => void
}
