import { FieldValues } from 'react-hook-form'
import { FieldController, TimeInput } from '@/components'
import type * as types from './type'

export const FormTimeInput = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ id, field }) => (
        <TimeInput id={id} value={field.value} onChange={field.onChange} />
      )}
    </FieldController>
  )
}
