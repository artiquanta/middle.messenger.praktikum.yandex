class EventBus {
  private _listeners: Record<string, Array<Function>>;

  constructor() {
    this._listeners = {};
  }

  public on(event: string, callback: Function): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  public emit(event: string, ...args: any[]): void {
    if (!this._listeners[event]) {
      throw new Error(`Событие ${event} отсутствует.`);
    }

    this._listeners[event]
      .forEach((listener: Function): void => listener(...args));
  }

  public off(event: string, callback: Function): void {
    if (!this._listeners[event]) {
      throw new Error(`Событие ${event} отсутствует.`);
    }

    this._listeners[event] = this._listeners[event]
      .filter((listener: Function): boolean => listener !== callback);
  }

  public offAll() {
    if (Object.keys(this._listeners).length === 0) {
      throw new Error('События отсутствуют');
    }

    this._listeners = {};
  }

  public hasSubscriber(event: string) {
    return this._listeners[event];
  }
}

export default EventBus;
