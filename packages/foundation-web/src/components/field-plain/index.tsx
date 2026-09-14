import { Text } from '@/components/text'
import { Field, FieldError, FieldLabel } from '@/shadcn/components/field'
import type * as types from './type'
import { EnumFormMode } from '@kilnonedre/foundation'

export const FieldPlain = ({
  required = false,
  mode = EnumFormMode.VIEW,
  ...props
}: types.ConfigProp) => {
  const value = props.value ?? '-'
  return (
    <>
      <Field data-invalid={props.invalid}>
        <FieldLabel htmlFor={props.id} required={required}>
          {props.name}
        </FieldLabel>
        {mode === EnumFormMode.VIEW ? <Text>{value}</Text> : props.children}
        {props.error && <FieldError errors={[{ message: props.error }]} />}
      </Field>
    </>
  )
}
