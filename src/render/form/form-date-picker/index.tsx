import { FieldValues } from 'react-hook-form'
import { DatePicker, FieldController } from '@/components'
import type * as types from './type'

export const FormDatePicker = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ id, field }) => (
        <DatePicker id={id} value={field.value} onChange={field.onChange} />
      )}
    </FieldController>
  )
}
