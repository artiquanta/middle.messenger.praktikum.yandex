import EventBus from "./EventBus";


/* function changePage(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
} */

// Отслеживаем событие изменения истории
/* window.addEventListener('popstate', (evt) => {
  evt.preventDefault();
  renderPage(window.location.pathname);
}); */


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

  constructor(root: Root = 'root', paths: Paths, error: unknown, callBack: Function) {
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
    /* let page;

    console.log(this._paths.includes(path))

    if (this._paths[path]) {
      page = new this._paths[path]();
    } else {
      page = this._error;
    }

    this._rootElement.appendChild(page.getContent()); */
    console.log(this._callBack);
    this._callBack(path);
  }

  changePage(path: string): void {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  }
}

export default BasicRouter;
