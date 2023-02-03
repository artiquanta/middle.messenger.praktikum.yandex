class EventBus {
  listeners: Record<string, Array<Function>>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Событие ${event} отсутствует.`);
    }

    this.listeners[event]
      .forEach((listener: Function): void => listener(...args));
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Событие ${event} отсутствует.`);
    }

    this.listeners[event] = this.listeners[event]
      .filter((listener: Function): boolean => listener !== callback);
  }
}

export default EventBus;
