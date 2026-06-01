import { ReactNode } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { FieldController, FieldGroup } from '@/components'
import { Button } from '@/shadcn/components/button'
import { DialogClose, DialogFooter } from '@/shadcn/components/dialog'
import { Input } from '@/shadcn/components/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shadcn/components/input-group'
import { Textarea } from '@/shadcn/components/textarea'
import { EnumFormMode } from '@/type'
import type * as types from './type'

export * from './type'

export const getSuccessMessage = (mode: EnumFormMode) => {
  switch (mode) {
    case EnumFormMode.CREATE:
      return '创建成功'

    case EnumFormMode.UPDATE:
      return '更新成功'

    case EnumFormMode.DELETE:
      return '删除成功'

    case EnumFormMode.VIEW:
      return ''
  }
}

export const renderFooter = (mode: EnumFormMode) => {
  switch (mode) {
    case EnumFormMode.VIEW:
      return (
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">关闭</Button>
          </DialogClose>
        </DialogFooter>
      )

    case EnumFormMode.DELETE:
      return (
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button variant="destructive" type="submit">
            确认删除
          </Button>
        </DialogFooter>
      )

    default:
      return (
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button type="submit">保存</Button>
        </DialogFooter>
      )
  }
}

export const renderConfirmFooter = () => {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">取消</Button>
      </DialogClose>
      <Button type="submit">确定</Button>
    </DialogFooter>
  )
}

export const renderBody = (
  mode: EnumFormMode,
  formFields: () => ReactNode,
  form: UseFormReturn<FieldValues>
) => {
  switch (mode) {
    case EnumFormMode.DELETE:
      return (
        <FieldGroup>
          {renderTextarea({
            mode,
            form,
            id: 'updatedReason',
            name: 'updatedReason',
            label: '删除原因',
          })}
        </FieldGroup>
      )

    default:
      return formFields()
  }
}

export const renderTextarea = <T extends FieldValues>(
  props: types.ConfigRenderBase<T>
) => {
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
          rows={4}
          className="resize-none"
          aria-invalid={fieldState.invalid}
        />
      )}
    </FieldController>
  )
}

export const renderInput = <T extends FieldValues>(
  props: types.ConfigRenderBase<T>
) => {
  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field, fieldState, id }) => (
        <Input {...field} id={id} aria-invalid={fieldState.invalid} />
      )}
    </FieldController>
  )
}

export const renderPasswordInput = <T extends FieldValues>(
  props: types.ConfigRenderPasswordInput<T>
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
