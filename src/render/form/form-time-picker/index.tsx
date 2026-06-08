import { FieldValues } from 'react-hook-form'
import { FieldController, TimePicker } from '@/components'
import type * as types from './type'

export const FormTimePicker = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ id, field }) => (
        <TimePicker id={id} value={field.value} onChange={field.onChange} />
      )}
    </FieldController>
  )
}
