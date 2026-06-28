import { emptyToUndefined } from '@/util/validator/empty-to-undefined'

export const toNumber = (value: unknown) => {
  const normalized = emptyToUndefined(value)
  if (normalized === undefined) {
    return undefined
  }
  return Number(normalized)
}
