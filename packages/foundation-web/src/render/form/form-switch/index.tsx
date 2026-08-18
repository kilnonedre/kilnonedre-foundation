import { FieldValues } from 'react-hook-form'
import { FieldController } from '@/components'
import { Switch } from '@/shadcn/components/switch'
import type * as types from './type'

export const FormSwitch = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field }) => (
        <Switch
          checked={field.value}
          onCheckedChange={checked => {
            field.onChange(checked)
            props.onChange?.(checked)
          }}
        />
      )}
    </FieldController>
  )
}
