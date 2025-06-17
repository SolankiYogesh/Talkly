type Listener = (...args: any[]) => void
type EventMap = {
  onLogOut: (reason?: string) => void
}
class SessionListener {
  private events: {[event: string]: Listener[]} = {}

  on<K extends keyof EventMap>(event: K, listener: EventMap[K]) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args))
    }
  }

  off<K extends keyof EventMap>(event: K, listener: EventMap[K]) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener)
    }
  }
}

export default new SessionListener()
