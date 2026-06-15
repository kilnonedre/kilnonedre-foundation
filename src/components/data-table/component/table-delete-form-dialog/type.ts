import { ReactNode } from 'react'
import { ConfigApiRespT, UUID } from '@/type'

export interface ConfigProp {
  id: UUID
  children: ReactNode
  onEdit: () => void
  onDelete: (
    id: UUID,
    payload: {
      updatedReason: string
    }
  ) => Promise<ConfigApiRespT<unknown>>
}
