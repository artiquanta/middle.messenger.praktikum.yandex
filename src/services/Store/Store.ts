import EventBus from '../EventBus/EventBus';
import set from '../../utils/helpers/set';
import { Indexed } from '../../types/types';

export enum StoreEvents {
  UPDATED = 'updated',
}

class Store extends EventBus {
  private _state: Indexed;

  constructor() {
    super();
    const storageData = this._getFromStorage();
    this._state = storageData ? JSON.parse(storageData) : {};
  }

  private _saveToStorage(): void {
    const stateToSave = this._state;
    if (stateToSave.safe) {
      delete stateToSave.safe;
    }
    localStorage.setItem('store', JSON.stringify(stateToSave));
  }

  private _getFromStorage(): string | null {
    return localStorage.getItem('store');
  }

  clearState(): void {
    this._state = {};
    localStorage.removeItem('store');
  }

  clearSafeState(): void {
    delete this._state.safe;
    if (this.hasSubscriber(StoreEvents.UPDATED)) {
      this.emit(StoreEvents.UPDATED);
    }
  }

  set(path: string, value: unknown, save: boolean = false): void {
    set(this._state, path, value);
    if (save) {
      this._saveToStorage();
    }

    // Если что-то подписано на событие, вызываем его
    if (this.hasSubscriber(StoreEvents.UPDATED)) {
      this.emit(StoreEvents.UPDATED);
    }
  }

  getState() {
    return this._state;
  }
}

export default new Store();
