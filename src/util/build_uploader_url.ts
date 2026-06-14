import { UUID } from '@/type'

export const buildUploaderUrl = (id: UUID, template?: string) => {
  if (!template) return ''
  return template.replaceAll('{id}', id)
}
