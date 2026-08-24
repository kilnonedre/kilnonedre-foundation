import { Field, FieldContent, FieldLabel } from '@/shadcn/components/field'
import type * as types from './type'
import { Checkbox } from '@/shadcn/components/checkbox'
import { ConfigField } from '@/print/type/element'

const FieldSelect = (props: types.ConfigBaseProp) => {
  return props.fields.map(field => (
    <Field
      key={field.field}
      orientation="horizontal"
      className="items-center! gap-2"
    >
      <Checkbox
        id={field.field}
        checked={props.isChecked(field)}
        onClick={() => {
          props.onSelect(field)
        }}
      />
      <FieldContent>
        <FieldLabel htmlFor={field.field}>{field.name}</FieldLabel>
      </FieldContent>
    </Field>
  ))
}

export const FieldSingleSelect = (props: types.ConfigSingleProp) => {
  const isChecked = (field: ConfigField) =>
    field.field === props.selectedField.field
  return (
    <FieldSelect
      fields={props.fields}
      onSelect={props.onSelect}
      isChecked={isChecked}
    />
  )
}

export const FieldMultiSelect = (props: types.ConfigMultiProp) => {
  const isChecked = (field: ConfigField) =>
    props.selectedFields.some(item => item.field === field.field)
  return (
    <FieldSelect
      fields={props.fields}
      onSelect={props.onSelect}
      isChecked={isChecked}
    />
  )
}
