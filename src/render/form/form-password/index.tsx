import { FieldValues } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { FieldController } from '@/components'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shadcn/components/input-group'
import type * as types from './type'

export const FormPasswordInput = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field, fieldState, id }) => (
        <InputGroup>
          <InputGroupInput
            {...field}
            id={id}
            type={props.hidden ? 'password' : 'text'}
            aria-invalid={fieldState.invalid}
            className="pr-10"
          />

          <InputGroupAddon align="inline-end" className="cursor-pointer">
            {props.hidden ? (
              <EyeOffIcon
                onClick={e => {
                  e.stopPropagation()
                  props.onHiddenChange(false)
                }}
              />
            ) : (
              <EyeIcon
                onClick={e => {
                  e.stopPropagation()
                  props.onHiddenChange(true)
                }}
              />
            )}
          </InputGroupAddon>
        </InputGroup>
      )}
    </FieldController>
  )
}
