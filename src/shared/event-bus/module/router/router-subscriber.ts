import { eventBus } from '@/shared/event-bus'

export const registerRouterSubscriber = (onLogoutRequired: () => void) => {
  eventBus.on('HTTP:UNAUTH', onLogoutRequired)

  return () => {
    eventBus.off('HTTP:UNAUTH', onLogoutRequired)
  }
}
