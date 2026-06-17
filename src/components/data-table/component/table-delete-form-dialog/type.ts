import { ConfigApiRespT, UUID } from '@/type'

export interface ConfigProp {
  id: UUID
  open: boolean
  onOpenChange: (_open: boolean) => void
  onEdit: () => void
  onDelete: (
    id: UUID,
    payload: {
      updatedReason: string
    }
  ) => Promise<ConfigApiRespT<unknown>>
}
