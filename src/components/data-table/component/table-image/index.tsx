import { useState } from 'react'
import { Eye } from 'lucide-react'
import { Button } from '@/shadcn/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/dialog'
import { buildUploaderUrl } from '@/util'
import type * as types from './type'

export const TableImage = (props: types.ConfigProp) => {
  const [preview, setPreview] = useState<string | null>(null)

  const imageUrls = [
    ...(props.urls ?? []),
    ...(props.ids ?? []).map(id => buildUploaderUrl(id, props.urlTemplate)),
  ].filter(Boolean)

  return (
    <div className="space-y-3">
      <div className="flex gap-3 overflow-x-auto">
        {imageUrls.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="group aspect-square w-25 overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
          >
            <div className="relative h-full w-full bg-muted">
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 flex items-start justify-end p-2 opacity-0 transition group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  type="button"
                  onClick={() => setPreview(url)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>预览</DialogTitle>
          </DialogHeader>

          {preview && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={preview}
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
