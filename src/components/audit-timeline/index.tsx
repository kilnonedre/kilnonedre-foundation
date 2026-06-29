import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { Badge } from '@/shadcn/components/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/card'
import { cn, formatDateTime } from '@/util'
import type * as types from './type'

export * from './preset'

const actionConfig = {
  CREATE: {
    label: '创建',
    icon: PlusIcon,
    className: 'bg-green-500',
    badge: 'bg-green-50 text-green-600 border-green-200',
  },
  UPDATE: {
    label: '更新',
    icon: PencilIcon,
    className: 'bg-blue-500',
    badge: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  DELETE: {
    label: '删除',
    icon: TrashIcon,
    className: 'bg-red-500',
    badge: 'bg-red-50 text-red-600 border-red-200',
  },
} as const

export const AuditTimeline = ({ data = [] }: types.ConfigProp) => {
  if (data.length === 0) {
    return (
      <div className="rounded-md border border-dashed py-10 text-center text-sm text-muted-foreground">
        暂无变更记录
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const config =
          actionConfig[item.action as keyof typeof actionConfig] ??
          actionConfig.UPDATE

        const Icon = config.icon

        return (
          <div key={item.id} className="relative flex gap-4">
            {index !== data.length - 1 && (
              <div className="absolute left-5 top-10 h-full w-px bg-border" />
            )}

            <div
              className={cn(
                'z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-white',
                config.className
              )}
            >
              <Icon className="size-4" />
            </div>

            <Card className="flex-1">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">
                        {config.label}记录
                      </CardTitle>
                      <Badge variant="outline" className={config.badge}>
                        {config.label}
                      </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      操作人：
                      {item.operator?.handle ?? item.operator?.username ?? '-'}
                      <span className="mx-2">·</span>
                      {formatDateTime(item.operatedAt)}
                    </div>
                  </div>

                  {item.updatedReason && (
                    <div className="text-sm text-muted-foreground">
                      操作原因：{item.updatedReason}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {item.changes.length > 0 ? (
                  <div className="overflow-hidden rounded-md border">
                    <div className="grid grid-cols-[1fr_1fr_40px_1fr] bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                      <div>字段</div>
                      <div>旧值</div>
                      <div />
                      <div>新值</div>
                    </div>

                    {item.changes.map(change => (
                      <div
                        key={change.field}
                        className="grid grid-cols-[1fr_1fr_40px_1fr] border-t px-4 py-3 text-sm"
                      >
                        <div className="text-muted-foreground">
                          {change.label}
                        </div>
                        <div>{change.oldText ?? '-'}</div>
                        <div className="text-center text-muted-foreground">
                          →
                        </div>
                        <div className="font-medium text-green-600">
                          {change.newText ?? '-'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                    无字段变更
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
