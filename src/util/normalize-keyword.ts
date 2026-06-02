export const normalizeKeyword = (value: string) =>
  value
    .replace(/[（）()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
