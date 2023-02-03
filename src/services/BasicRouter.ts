import EventBus from './EventBus';

type Root = string;
type Paths = string[];

class BasicRouter {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDU: 'flow:component-did-update',
  };

  _rootElement: HTMLElement;

  _paths: Paths;

  _eventBus: EventBus;

  _error: unknown; //

  _callBack: Function;

  constructor(paths: Paths, error: unknown, callBack: Function, root: Root = 'root') {
    this._rootElement = document.getElementById(root)!;
    this._paths = paths;
    this._eventBus = new EventBus();
    this._registerEvents();
    this._eventBus.emit(BasicRouter.EVENTS.INIT);
    this._error = error;
    this._callBack = callBack;
  }

  _registerEvents(): void {
    this._eventBus.on(BasicRouter.EVENTS.INIT, this._addEventListeners.bind(this));
  }

  _addEventListeners(): void {
    window.addEventListener('popstate', (evt) => {
      evt.preventDefault();
      this._callBack(window.location.pathname);
    });
  }

  _renderPage(path: string): void {
    this._rootElement.innerHTML = '';
    this._callBack(path);
  }

  changePage(path: string): void {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  }
}

export default BasicRouter;
