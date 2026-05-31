import { useCallback, useEffect, useRef, useState } from 'react'
import { Eye, Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shadcn/components/button'
import { Card } from '@/shadcn/components/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/dialog'
import { ScrollArea } from '@/shadcn/components/scroll-area'
import { cn, genUuid } from '@/util'
import type * as types from './type'

export const MediaUploader = ({ value = [], ...props }: types.ConfigProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [items, setItems] = useState<Array<types.MediaItem>>([])
  const [preview, setPreview] = useState<types.MediaItem | null>(null)

  const readonly = !!props.readonly
  const disabled = !!props.disabled
  const canEdit = !readonly && !disabled

  useEffect(() => {
    let cancelled = false

    async function hydrateFromValue(ids: Array<string>) {
      const existed = new Map<string, types.MediaItem>()

      items.forEach(it => {
        if (it.uploadId) existed.set(it.uploadId, it)
      })

      const next: Array<types.MediaItem> = []

      for (const id of ids) {
        const old = existed.get(id)

        if (old?.url) {
          next.push(old)
          continue
        }

        next.push({
          id: genUuid(),
          uploadId: id,
          uploading: true,
        })
      }

      if (!cancelled) setItems(next)

      const results = await Promise.all(
        ids.map(async objectId => {
          try {
            const resp = await props.read(objectId)

            if (resp.code !== '200') {
              throw new Error(resp.msg || 'read failed')
            }

            return {
              objectId,
              url: resp.data.url as string,
            }
          } catch {
            return {
              objectId,
              url: '',
            }
          }
        })
      )

      if (cancelled) return

      setItems(prev =>
        prev.map(it => {
          if (!it.uploadId) return it

          const found = results.find(r => r.objectId === it.uploadId)
          if (!found) return it

          return {
            ...it,
            url: found.url || it.url,
            uploading: false,
          }
        })
      )
    }

    hydrateFromValue(value)

    return () => {
      cancelled = true
    }
  }, [value.join('|')])

  const emitIds = useCallback(
    (nextItems: Array<types.MediaItem>) => {
      const ids = nextItems
        .filter(it => !!it.uploadId)
        .map(it => it.uploadId!) as Array<string>

      props.onChange?.(ids)
    },
    [props.onChange]
  )

  const handleFile = async (file: File) => {
    if (!canEdit) return

    const maxSizeKb = props.maxSizeKb

    if (maxSizeKb && file.size > maxSizeKb * 1024) {
      props.onError?.(`文件大小不能超过 ${maxSizeKb}KB`)
      return
    }

    const localId = genUuid()
    const localUrl = URL.createObjectURL(file)

    setItems(prev => [
      ...prev,
      {
        id: localId,
        localUrl,
        uploading: true,
      },
    ])

    try {
      const fd = new FormData()
      fd.append('file', file)

      const resp = await props.upload(fd)
      if (resp.code !== '200') return

      const uploadId = resp.data.id as string
      const url = resp.data.url as string

      setItems(prev => {
        const next = prev.map(it =>
          it.id === localId
            ? {
                ...it,
                url,
                uploadId,
                uploading: false,
              }
            : it
        )

        queueMicrotask(() => emitIds(next))
        return next
      })
    } finally {
      URL.revokeObjectURL(localUrl)
    }
  }

  const remove = (localId: string) => {
    if (!canEdit) return

    setItems(prev => {
      const next = prev.filter(it => it.id !== localId)

      queueMicrotask(() => emitIds(next))

      if (preview?.id === localId) {
        setPreview(null)
      }

      return next
    })
  }

  const showUploadButton =
    canEdit && ((!props.multiple && items.length === 0) || props.multiple)

  return (
    <div className={cn('space-y-3', props.className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={false}
        className="hidden"
        disabled={!canEdit}
        onChange={e => {
          const files = e.target.files
          if (!files) return

          Array.from(files).forEach(handleFile)
          e.target.value = ''
        }}
      />

      <ScrollArea className="rounded-lg border">
        <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((it, index) => (
            <Card key={it.id + index} className="group overflow-hidden">
              <div className="relative aspect-square bg-muted">
                {it.url || it.localUrl ? (
                  <img
                    src={it.url ?? it.localUrl!}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full" />
                )}

                {it.uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}

                {!it.uploading && (it.url || it.localUrl) && (
                  <div className="absolute inset-0 flex items-start justify-end gap-2 p-2 opacity-0 transition group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => setPreview(it)}
                      type="button"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {canEdit && (
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => remove(it.id)}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}

          {showUploadButton && (
            <Card
              className="flex aspect-square cursor-pointer items-center justify-center hover:bg-muted/50"
              onClick={() => {
                inputRef.current?.click()
              }}
            >
              <Plus className="h-6 w-6 text-muted-foreground" />
            </Card>
          )}
        </div>
      </ScrollArea>

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>预览</DialogTitle>
          </DialogHeader>

          {preview && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={preview.url ?? preview.localUrl ?? ''}
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
