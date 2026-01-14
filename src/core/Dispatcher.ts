import type {
  GameAction,
  GameActionCallback,
  GameActionPayloads,
  GameActionType,
} from '../types/gameAction'

export class Dispatcher {
  // 1. Use Map with a broader type internally
  private listeners = new Map<GameActionType, Set<GameActionCallback<GameActionType>>>()

  subscribe<K extends GameActionType>(type: K, callback: GameActionCallback<K>): () => void {
    // 2. Get or Create the Set
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }

    // 3. We cast the Set specifically for this operation
    const callbacks = this.listeners.get(type) as Set<GameActionCallback<K>>
    callbacks.add(callback)

    return () => this.unsubscribe(type, callback)
  }

  dispatch<K extends GameActionType>(action: GameAction<K>): void {
    const callbacks = this.listeners.get(action.type)
    if (!callbacks) return

    // Inside here, callbacks is Set<GameActionCallback<any>>,
    // but because of the dispatch signature, 'payload' is the correct K version.
    callbacks.forEach((cb) => {
      try {
        cb(action.payload as GameActionPayloads[K])
      } catch (error) {
        console.error(`[Dispatcher Error] ${action.type}:`, error)
      }
    })
  }

  unsubscribe<K extends GameActionType>(type: K, callback: GameActionCallback<K>): void {
    const callbacks = this.listeners.get(type)
    if (callbacks) {
      callbacks.delete(callback as GameActionCallback<GameActionType>)
    }
  }

  subscribeOnce<K extends GameActionType>(type: K, callback: GameActionCallback<K>): void {
    const unbind = this.subscribe(type, (payload) => {
      unbind()
      callback(payload)
    })
  }
}

export type DispatcherSubscription = () => void
