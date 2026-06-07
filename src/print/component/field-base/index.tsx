import { ReactNode } from 'react'
import { HexColorPicker } from 'react-colorful'
import { CircleQuestionMark } from 'lucide-react'
import { FormSelect } from '@/components'
import { Field, FieldLabel } from '@/shadcn/components/field'
import { Input } from '@/shadcn/components/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/popover'
import { Textarea } from '@/shadcn/components/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shadcn/components/tooltip'
import { CommonOption } from '@/type'
import { cn } from '@/util'

export type FieldLayout = 'vertical' | 'horizontal'

export type FieldBaseProps = {
  id: string
  label?: string
  tip?: string
  required?: boolean
  layout?: FieldLayout
  labelClassName?: string
  children?: ReactNode
  maxWidth?: number
  labelWidth?: number
}

export const FieldBaseInput = (
  props: FieldBaseProps & {
    value?: string
    onChange?: (_value: string) => void
    placeholder?: string
  }
) => {
  return (
    <FieldBase {...props}>
      <Input
        id={props.id}
        value={props.value}
        onChange={e => props.onChange?.(e.target.value)}
        placeholder={props.placeholder}
      />
    </FieldBase>
  )
}

export const FieldBaseEnumSelect = (
  props: FieldBaseProps & {
    value: string
    onValueChange: (_val: string) => void
    onLabelChange?: (_val: string) => void
    optionList: Array<CommonOption>
  }
) => {
  return (
    <FieldBase {...props}>
      <FormSelect
        value={props.value}
        onValueChange={props.onValueChange}
        onLabelChange={val => {
          props.onLabelChange?.(val)
        }}
        invalid={true}
        optionList={props.optionList}
      />
    </FieldBase>
  )
}

export const FieldBaseTextarea = (
  props: FieldBaseProps & {
    value?: string
    onChange?: (_value: string) => void
    placeholder?: string
  }
) => {
  return (
    <FieldBase {...props}>
      <Textarea
        id={props.id}
        value={props.value}
        onChange={e => props.onChange?.(e.target.value)}
        placeholder={props.placeholder}
      />
    </FieldBase>
  )
}

export const FieldBaseSelect = (
  props: FieldBaseProps & {
    value?: string
    onChange?: (_value: string) => void
    placeholder?: string
  }
) => {
  return (
    <FieldBase {...props}>
      <Textarea
        id={props.id}
        value={props.value}
        onChange={e => props.onChange?.(e.target.value)}
        placeholder={props.placeholder}
      />
    </FieldBase>
  )
}

export const FieldBaseColor = (
  props: FieldBaseProps & {
    color?: string
    onChange?: (_value: string) => void
  }
) => {
  return (
    <FieldBase {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="h-8 w-8 rounded-full border border-gray-300 block"
            style={{
              backgroundColor: props.color,
            }}
          />
        </PopoverTrigger>

        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={props.color} onChange={props.onChange} />
        </PopoverContent>
      </Popover>
    </FieldBase>
  )
}

export const FieldBase = ({
  required = false,
  layout = 'horizontal',
  ...props
}: FieldBaseProps) => {
  const isHorizontal = layout === 'horizontal'

  return (
    <Field
      style={{
        maxWidth: props.maxWidth,
      }}
    >
      <div
        className={cn(
          'flex',
          isHorizontal
            ? 'items-center gap-spacing-sm'
            : 'flex-col gap-spacing-xs'
        )}
      >
        {(props.label || props.tip) && (
          <div
            className={cn(
              'flex shrink-0 items-center gap-spacing-xs',
              props.labelWidth && `w-[${props.labelWidth}px]`,
              props.labelClassName
            )}
          >
            {props.label && (
              <FieldLabel htmlFor={props.id} required={required}>
                {props.label}
              </FieldLabel>
            )}

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
        )}

        <div className={cn(isHorizontal && 'min-w-0 flex-1')}>
          {props.children}
        </div>
      </div>
    </Field>
  )
}
