import { Field, FieldLabel } from '@/shadcn/components/field'
import type * as types from './type'

export const FieldText = ({
  id,
  name,
  value,
  placeholder = '-',
  required = false,
  render,
}: types.ConfigProp) => {
  const isEmpty = value === '' || value == null

  return (
    <Field>
      <FieldLabel htmlFor={id} required={required}>
        {name}
      </FieldLabel>

      <div id={id} className="text-sm leading-6">
        {render ?? (isEmpty ? placeholder : value)}
      </div>
    </Field>
  )
}
