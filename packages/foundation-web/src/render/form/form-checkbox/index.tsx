import { FieldValues } from 'react-hook-form'
import { CheckboxSingleList, FieldController } from '@/components'
import type * as types from './type'

export { ConfigProp as ConfigFormCheckboxProp } from './type'

export const FormCheckbox = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field }) => (
        <CheckboxSingleList
          options={props.options}
          value={field.value}
          onChange={val => {
            field.onChange(val)
            props.onChange?.(val)
          }}
        />
      )}
    </FieldController>
  )
}
