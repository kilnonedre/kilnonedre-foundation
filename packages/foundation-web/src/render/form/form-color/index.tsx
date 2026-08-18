import { HexColorPicker } from 'react-colorful'
import { FieldValues } from 'react-hook-form'
import { FieldController } from '@/components'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/popover'
import type * as types from './type'

export const FormColor = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? false}
    >
      {({ field, fieldState, id }) => (
        <Popover>
          <PopoverTrigger asChild>
            <button
              id={id}
              type="button"
              aria-invalid={fieldState.invalid}
              className="h-8 w-8 rounded-full border border-gray-300 block"
              style={{
                backgroundColor: field.value,
              }}
            />
          </PopoverTrigger>

          <PopoverContent className="w-auto p-3">
            <HexColorPicker
              color={field.value ?? '#000000'}
              onChange={field.onChange}
            />
          </PopoverContent>
        </Popover>
      )}
    </FieldController>
  )
}
