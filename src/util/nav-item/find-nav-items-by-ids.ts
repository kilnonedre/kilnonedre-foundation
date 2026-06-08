import { ConfigNavItem, ConfigPermissionItem } from '@/type'

export const findNavItemsByIds = (
  navMain: Array<ConfigNavItem>,
  ids: Array<string>
): Array<ConfigPermissionItem> => {
  const idSet = new Set(ids)

  return navMain.reduce<Array<ConfigPermissionItem>>((acc, item) => {
    const walk = (
      node: ConfigNavItem,
      parentTitles: Array<string> = [],
      parentUrl = ''
    ) => {
      const currentTitles = [...parentTitles, node.title]

      const currentUrl = node.url.startsWith('/')
        ? node.url
        : `${parentUrl}/${node.url}`.replace(/\/+/g, '/')

      if (idSet.has(node.id)) {
        acc.push({
          id: node.id,
          title: node.title,
          fullTitle: currentTitles.join(' / '),
          url: currentUrl,
        })
      }

      node.items?.forEach(child => walk(child, currentTitles, currentUrl))
    }

    walk(item)

    return acc
  }, [])
}
