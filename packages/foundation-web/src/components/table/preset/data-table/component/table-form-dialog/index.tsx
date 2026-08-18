import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/dialog'
import type * as types from './type'
import { cn, EnumFormMode, EnumFormModeLabel } from '@kilnonedre/foundation'

export const TableFormDialog = (props: types.ConfigProp) => {
  const { bodyHeight = 'max-h-100', limitHeight = true } = props

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-106.25 flex max-h-[90vh] flex-col">
        <DialogHeader>
          <DialogTitle>{EnumFormModeLabel[props.mode]}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={props.onSubmit}
          className="flex min-h-0 flex-1 flex-col space-y-4"
        >
          <div
            className={cn(
              'min-h-0 overflow-y-auto rounded-md p-2',
              props.mode !== EnumFormMode.DELETE &&
                limitHeight &&
                (typeof bodyHeight === 'number'
                  ? `max-h-[${bodyHeight}px]`
                  : bodyHeight)
            )}
          >
            {props.renderBody()}
          </div>

          {props.renderFooter()}
        </form>
      </DialogContent>
    </Dialog>
  )
}
