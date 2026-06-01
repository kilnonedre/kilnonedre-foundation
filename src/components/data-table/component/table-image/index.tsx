import { useState } from 'react'
import { Eye } from 'lucide-react'
import { Button } from '@/shadcn/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/dialog'
import { CommonObject } from '@/type'
import type * as types from './type'

export const TableImage = (props: types.ConfigProp) => {
  const [preview, setPreview] = useState<CommonObject | null>(null)

  return (
    <div className="space-y-3">
      <div className="flex gap-3 overflow-x-auto">
        {props.value.map((img, index) => (
          <div
            key={img.id + index}
            className="rounded-xl border bg-card text-card-foreground shadow group overflow-hidden w-25 aspect-square"
          >
            <div className="relative bg-muted">
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />

              {/* hover 操作 */}
              <div className="absolute inset-0 flex items-start justify-end p-2 opacity-0 transition group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  type="button"
                  onClick={() => setPreview(img)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 弹窗预览 */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>预览</DialogTitle>
          </DialogHeader>

          {preview && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={preview.url}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
