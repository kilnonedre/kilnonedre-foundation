export const isEmpty = (v: unknown): boolean => {
  if (v === undefined || v === null) return true
  if (typeof v === 'string' && v === '') return true
  if (Array.isArray(v) && v.length === 0) return true
  return false
}
