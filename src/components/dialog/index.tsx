import { useState } from 'react'
import { Button } from '@/components/button'
import {
  Dialog as ShadcnDialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/components/dialog'
import { EnumVariant } from '@/type/enum'
import type * as types from './type'

export const Dialog = (props: types.ConfigProp) => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    if (!props.onConfirm) {
      setOpen(false)
      return
    }

    try {
      setConfirmLoading(true)
      await props.onConfirm()
      setOpen(false)
    } finally {
      setConfirmLoading(false)
    }
  }

  return (
    <ShadcnDialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{props.title ?? '提示'}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {typeof props.content === 'string' ? (
            <div>{props.content}</div>
          ) : (
            props.content
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={EnumVariant.OUTLINE} disabled={confirmLoading}>
              {props.cancelText ?? '取消'}
            </Button>
          </DialogClose>

          <Button
            type="button"
            loading={confirmLoading}
            disabled={confirmLoading}
            onClick={handleConfirm}
          >
            {props.confirmText ?? '确认'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  )
}
