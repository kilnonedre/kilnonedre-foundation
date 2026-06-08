import { FieldPlain, FormSelect } from '@/components'
import type * as types from './type'

export const FormPlainEnumSelect = (props: types.ConfigProp) => {
  return (
    <FieldPlain
      id={props.id}
      name={props.name}
      mode={props.mode}
      required={props.required ?? true}
    >
      <FormSelect
        value={props.value}
        onValueChange={props.onChange}
        onLabelChange={val => {
          props.onLabelChange?.(val)
        }}
        invalid={props.invalid ?? true}
        optionList={props.options}
      />
    </FieldPlain>
  )
}
