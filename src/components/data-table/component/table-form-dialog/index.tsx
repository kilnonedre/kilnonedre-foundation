import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/components/dialog'
import { ScrollArea } from '@/shadcn/components/scroll-area'
import { EnumFormMode, EnumFormModeLabel } from '@/type/enum'
import { cn } from '@/util'
import type * as types from './type'

export const TableFormDialog = (props: types.ConfigProp) => {
  const { bodyHeight = 'h-100', limitHeight = true } = props

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{EnumFormModeLabel[props.mode]}</DialogTitle>
        </DialogHeader>
        <form onSubmit={props.onSubmit} className="space-y-4">
          <ScrollArea
            className={cn(
              'rounded-md',
              props.mode !== EnumFormMode.DELETE &&
                limitHeight &&
                (typeof bodyHeight === 'number'
                  ? `h-[${bodyHeight}px]`
                  : bodyHeight)
            )}
          >
            <div className="p-2">{props.renderBody()}</div>
          </ScrollArea>
          {props.renderFooter()}
        </form>
      </DialogContent>
    </Dialog>
  )
}
