import { FolderOpen } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from '@/shadcn/components/empty'

export const TableEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyDescription>尚未创建任何内容</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
