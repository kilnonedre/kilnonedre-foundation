import { ConfigNavItem } from '@/type'

export const findNavItemByUrl = (
  navMain: Array<ConfigNavItem>,
  url: string
): ConfigNavItem | undefined => {
  const walk = (
    items: Array<ConfigNavItem>,
    parentUrl = ''
  ): ConfigNavItem | undefined => {
    for (const item of items) {
      const currentUrl = item.url.startsWith('/')
        ? item.url
        : `${parentUrl}/${item.url}`.replace(/\/+/g, '/')

      if (currentUrl === url) {
        return item
      }

      if (item.items?.length) {
        const result = walk(item.items, currentUrl)

        if (result) return result
      }
    }

    return undefined
  }

  return walk(navMain)
}
