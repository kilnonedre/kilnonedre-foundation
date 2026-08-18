import { FieldValues } from 'react-hook-form'
import { FieldController, TimeRangeInput } from '@/components'
import type * as types from './type'

export const FormTimeRangeInput = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ id, field }) => (
        <TimeRangeInput id={id} value={field.value} onChange={field.onChange} />
      )}
    </FieldController>
  )
}
