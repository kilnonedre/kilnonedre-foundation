import { AuditTimeline } from '@/components/audit-timeline'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/dialog'
import type * as types from './type'
import { cn, EnumVariant } from '@kilnonedre/foundation'

export const AuditTimelineDialog = (props: types.ConfigProp) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        className="sm:max-w-[70vw] flex max-h-[90vh] flex-col"
        onOpenAutoFocus={event => {
          event.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>变更记录</DialogTitle>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col space-y-4">
          <div className={cn('min-h-0 overflow-y-auto rounded-md p-2')}>
            <AuditTimeline data={props.diffs} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={EnumVariant.OUTLINE}>关闭</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
