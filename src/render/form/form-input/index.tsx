import { FieldValues } from 'react-hook-form'
import { FieldController } from '@/components'
import { Input } from '@/shadcn/components/input'
import { EnumInputType } from '@/type'
import type * as types from './type'

export const FormInputText = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field, fieldState, id }) => (
        <Input
          {...field}
          id={id}
          value={field.value ?? ''}
          aria-invalid={fieldState.invalid}
          type={EnumInputType.TEXT}
        />
      )}
    </FieldController>
  )
}

export const FormInputNumber = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field, fieldState, id }) => (
        <Input
          {...field}
          id={id}
          value={field.value ?? ''}
          aria-invalid={fieldState.invalid}
          type={EnumInputType.NUMBER}
          onChange={event => {
            const value = event.target.value
            field.onChange(value === '' ? undefined : Number(value))
          }}
          className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      )}
    </FieldController>
  )
}
