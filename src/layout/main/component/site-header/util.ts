import { ConfigNavItem } from '@/type'

export const createRouteMetaMap = (
  navMain: Array<ConfigNavItem>
): Record<string, { title: string; navigable: boolean }> => {
  return navMain.reduce<Record<string, { title: string; navigable: boolean }>>(
    (acc, item) => {
      const walk = (node: ConfigNavItem, parentUrl = '') => {
        const currentUrl = node.url.startsWith('/')
          ? node.url
          : `${parentUrl}/${node.url}`.replace(/\/+/g, '/')

        acc[currentUrl] = {
          title: node.title,
          navigable: node.navigable ?? true,
        }

        node.items?.forEach(child => walk(child, currentUrl))
      }

      walk(item)

      return acc
    },
    {
      '/dashboard': {
        title: '总览',
        navigable: true,
      },
    }
  )
}

export const buildCrumbs = (
  navMain: Array<ConfigNavItem>,
  pathname: string,
  merchantCode?: string
) => {
  const routeMetaMap = createRouteMetaMap(navMain)

  const clean = pathname.split('?')[0].split('#')[0]
  let segments = clean.split('/').filter(Boolean)
  if (merchantCode && segments[0] === merchantCode) {
    segments = segments.slice(1)
  }
  const home = {
    href: `/${merchantCode}/dashboard`,
    label: routeMetaMap['/dashboard']?.title ?? '总览',
    navigable: routeMetaMap['/dashboard']?.navigable ?? true,
  }

  if (segments.length === 0 || segments[0] === 'dashboard') {
    return [home]
  }

  const crumbs = segments.map((seg, idx) => {
    const route = '/' + segments.slice(0, idx + 1).join('/')
    const meta = routeMetaMap[route]
    const href =
      '/' +
      [merchantCode, ...segments.slice(0, idx + 1)].filter(Boolean).join('/')
    return {
      href,
      label: meta?.title ?? decodeURIComponent(seg),
      navigable: meta?.navigable ?? true,
    }
  })
  return [home, ...crumbs]
}
