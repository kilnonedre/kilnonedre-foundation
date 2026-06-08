import { FieldValues } from 'react-hook-form'
import { FieldController } from '@/components'
import { Input } from '@/shadcn/components/input'
import type * as types from './type'

export const FormInput = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field, fieldState, id }) => (
        <Input {...field} id={id} aria-invalid={fieldState.invalid} />
      )}
    </FieldController>
  )
}
