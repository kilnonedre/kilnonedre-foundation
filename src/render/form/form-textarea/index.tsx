import { FieldValues } from 'react-hook-form'
import { FieldController } from '@/components'
import { Textarea } from '@/shadcn/components/textarea'
import type * as types from './type'

export * from './preset'

export const FormTextarea = <T extends FieldValues>({
  rows = 4,
  ...props
}: types.ConfigProp<T>) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field, fieldState, id }) => (
        <Textarea
          {...field}
          id={id}
          rows={rows}
          className="resize-none"
          aria-invalid={fieldState.invalid}
        />
      )}
    </FieldController>
  )
}
