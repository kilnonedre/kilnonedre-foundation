import { registerRouterSubscriber } from '@/shared/event-bus/module/router'
import { registerToastSubscriber } from './toast/toast-subscriber'

export * from './router'
export * from './toast'

type Cleanup = void | (() => void)

const composeCleanups = (...cleanups: Cleanup[]) => {
  return () => {
    cleanups.forEach(fn => typeof fn === 'function' && fn())
  }
}

export const assembleApp = (onLogoutRequired: () => void) => {
  return composeCleanups(
    registerToastSubscriber(),
    registerRouterSubscriber(onLogoutRequired)
  )
}
