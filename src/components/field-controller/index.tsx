import { Controller } from 'react-hook-form'
import { CircleQuestionMark } from 'lucide-react'
import { Field, FieldError, FieldLabel } from '@/shadcn/components/field'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shadcn/components/tooltip'
import type * as types from './type'

export const FieldController = ({
  required = false,
  ...props
}: types.ConfigProp) => {
  return (
    <Controller
      name={props.id}
      control={props.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center gap-spacing-xs">
            <FieldLabel htmlFor={props.id} required={required}>
              {props.name}
            </FieldLabel>

            {props.tip && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark
                    size="1rem"
                    className="text-muted-foreground"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="max-w-[20em] wrap-break-word"
                >
                  {props.tip}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          {/* {mode === EnumFormMode.VIEW ? (
            <Text>{label}</Text>
          ) : ( */}
          {props.children({
            field,
            fieldState,
            id: props.id,
          })}
          {/* )} */}
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
