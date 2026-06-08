export const getNavPathname = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean)
  return `/${parts.slice(1).join('/')}`
}
