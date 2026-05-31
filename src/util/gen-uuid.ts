import { v4 as uuidv4 } from 'uuid'
import { UUID } from '@/type'

export const genUuid = (): UUID => {
  return uuidv4() as UUID
}
