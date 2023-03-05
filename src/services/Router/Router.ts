import Route from './Route';
import Block from '../Block';
import { Indexed } from '../../types/types';

class Router {
  _routes: Route[];

  _history;

  _currentRoute: Route | null = null;

  _rootQuery;

  static __instance: Router;

  constructor(rootQuery: string) {
    /* eslint no-constructor-return: "off" */
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];
    this._history = window.history as History;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, props: Indexed) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, props });
    this._routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = ((evt: PopStateEvent) => {
      evt.preventDefault();
      const target = evt.currentTarget! as Window;
      const pathName = target.location.pathname;
      this._onRoute(pathName);
    });

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      if (this.getRoute('/*')) {
        this._onRoute('/*');
        return;
      }
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this._history!.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this._history!.back();
  }

  forward(): void {
    this._history!.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this._routes.find((route) => route.match(pathname));
  }
}

export default Router;
