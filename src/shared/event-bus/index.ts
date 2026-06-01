import type * as types from './type'

export * from './module'
export * from './type'

class EventBus {
  private listeners = new Map<keyof types.Events, Set<types.AnyFn>>()

  on<K extends keyof types.Events>(
    event: K,
    cb: types.Listener<types.Events[K]>
  ) {
    let set = this.listeners.get(event)
    if (!set) {
      set = new Set<types.AnyFn>()
      this.listeners.set(event, set)
    }

    // 存的时候转成统一签名（不再用 Function）
    set.add(cb as unknown as types.AnyFn)

    // 返回 cleanup
    return () => this.off(event, cb)
  }

  off<K extends keyof types.Events>(
    event: K,
    cb: types.Listener<types.Events[K]>
  ) {
    this.listeners.get(event)?.delete(cb as unknown as types.AnyFn)
  }

  emit<K extends keyof types.Events>(event: K, payload: types.Events[K]) {
    this.listeners.get(event)?.forEach(fn => {
      ;(fn as unknown as types.Listener<types.Events[K]>)(payload)
    })
  }
}

export const eventBus = new EventBus()
