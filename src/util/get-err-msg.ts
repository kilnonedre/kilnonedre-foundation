export const getErrorMessage = (e: unknown): string => {
  if (e instanceof Error) {
    return e.message
  }

  return '系统错误'
}
