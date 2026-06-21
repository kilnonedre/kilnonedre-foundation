import { UUID } from '@/type/uuid'

export interface CommonAccount {
  id: UUID
  profileId: UUID
  username: string
  handle: string
  email?: string
  phone?: string
}
