import { FieldValues } from 'react-hook-form'
import { FieldController, FormSelect } from '@/components'
import type * as types from './type'

export * from './preset'

export const FormEnumSelect = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field, fieldState }) => (
        <FormSelect
          value={field.value}
          onValueChange={field.onChange}
          onLabelChange={val => {
            props.onLabelChange?.(val)
          }}
          invalid={fieldState.invalid}
          optionList={props.options}
        />
      )}
    </FieldController>
  )
}
