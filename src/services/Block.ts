import EventBus from "./EventBus";
import { v4 as makeUUID } from "uuid";

type PropsAndChildren = Record<string, Block | unknown>;
//type Props = Record<string, Object | unknown>;

type Props = {
  [key: string]: unknown,
  //events?: Record<keyof HTMLElementEventMap, Function>[];
  //events?: Record<string, string | Record<keyof HTMLElementEventMap, (arg?: Event) => void>>[],
  events?: Record<string, string | Record<keyof HTMLElementEventMap, (arg?: Event) => void>>[],
};

type Children = Record<string, Block>; //| Record<string, Block>[]

class Block {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  // Разобраться с этим!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  _meta: Record<string, string | unknown>;
  _id: string;
  props: Props;
  children: Children;
  _eventBus: EventBus;
  _element: HTMLElement;
  constructor(propsAndChildren: PropsAndChildren = {}) {
    /*  constructor(tagName: string = 'div', propsAndChildren: PropsAndChildren = {}) { */
    const { children, props } = this._getChildren(propsAndChildren);

    //const eventBus: EventBus = new EventBus();
    this._eventBus = new EventBus();

    // Meta ????????????????????????????????????????????????????????????????????????//
    this._meta = {
      //tagName,
    };

    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, _id: this._id });
    //this.children = children;
    // Правильно ли?
    this.children = this._makePropsProxy(children) as Children;
    //this.children = this._makePropsProxy(children);
    //this.eventBus = (): EventBus => eventBus;
    this._registerEvents();
    // Временное добавление присвоения элемента
    //this._element = this._createDocumentElement(tagName);
    this._eventBus.emit(Block.EVENTS.INIT);
    //this._element = this._createDocumentElement('div');
  }



  _getChildren(propsAndChildren: PropsAndChildren): { children: Children, props: Props } {

    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]: [string, Block | unknown]): void => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(): void {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /*   _createResources(): void {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
   */
  init(): void {
    // this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // Проверить, добавить проверку, возможно даже метод изменить
  _componentDidMount(): void {
    Object.values(this.children).forEach((child): void => {
      child.dispatchComponentDidMount();
    })

    /*     if (this.componentDidMount()) {
          Object.values(this.children).forEach((child): void => {
            child.dispatchComponentDidMount();
          })
        } */

  }

  // Проверить
  componentDidMount(): boolean {
    return true;
  }

  // Проверить
  dispatchComponentDidMount(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    /*  this._eventBus.emit(Block.EVENTS.FLOW_CDM);
     if (Object.keys(this.children).length) {
       this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
     }
  */
  }

  // Раскомментированное содержимое
  _componentDidUpdate(oldProps: Props, newProps: Props): void {
   /*  const isDifferent = Object.keys(oldProps).some((prop: string): boolean => oldProps[prop] !== newProps[prop]);
    if (isDifferent) {
      this.componentDidUpdate(oldProps, newProps); // убраны пропсы
      this._render();
    } */
    this.componentDidUpdate(oldProps, newProps); // вернуть пропсы в качестве аргументов
    this._render();
    //}
  }

  // Также проверить. Возможно, убрать вызов.
  componentDidUpdate() {}

  setProps(newProps: Props): void {
    if (!newProps) {
      return;
    }

    // Добавляем новые пропсы в объект с имеющимися пропсами
    Object.assign(this.props, newProps);
  }

  // Типы проверить?, проверить функцию!!!!!!!! Проверять, если child - массив. Пройтись по каждому его элементу
  compile(template: (args?: Record<string, unknown>) => string, props: Record<string, unknown> = {}): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = { ...props };
   //console.warn(this.constructor.name)

    Object.entries(this.children).forEach(([key, child]: [string, Block | []]): void => {
      if (Array.isArray(child)) {
        const tempArray = [];
        child.forEach((element: Block) => {
          tempArray.push(`<div data-id="${element._id}"></div>`);
        });
        propsAndStubs[key] = tempArray;
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment: HTMLTemplateElement = this._createDocumentElement('template');
    fragment.innerHTML = template(propsAndStubs);
    console.info(this.constructor.name)
    //console.log(fragment.innerHTML)
    console.log(propsAndStubs)
    console.info('------------')

/*     Object.values(this.children).forEach((child: Block): void => {
      const stub: HTMLElement = fragment.content.querySelector(`[data-id="${child._id}"]`)!;
      stub.replaceWith(child.getContent());
    }); */
        Object.entries(this.children).forEach(([key, child]: [string, Block | []]): void => {
          if (Array.isArray(child)) {
            child.forEach((element: Block) => {
              const stub: HTMLElement = fragment.content.querySelector(`[data-id="${element._id}"]`)!;
              stub.replaceWith(element.getContent());
            })
          } else {
            const stub: HTMLElement = fragment.content.querySelector(`[data-id="${child._id}"]`)!;
            stub.replaceWith(child.getContent());
          }
        });
        // массив целимком добавляется. Нужно как-то убрать запятые
        console.log(fragment.content)

    // Попытка реализации через precompile без compile Handlebars
    return fragment.content;
  }

  // Возможно, можно убрать использование this._element ----------------------------------------------------
  /*   getElement(): HTMLElement {
      return this._element;
    }
   */
  _render(): void {
    //this._element.innerHTML = '';
    this._element = this.render();
    // const block = this.render();
    this._removeEvents();
    /* this._element.appendChild(block); */
    this._addEvents();
  }

  // ?
  render(): any { }

  getContent(): HTMLElement {
    return this._element;
  }

  // Переделать, чтобы рендерить не каждый пропс!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! и посмотреть на eventbus
  _makePropsProxy(props: Props): Props {
    const self: this = this;
    return new Proxy(props, {
      get(target, prop: string): boolean {
        /*     if (prop.startsWith('_')) {
              throw new Error('Нет доступа');
            } */

        const value: unknown = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: unknown): boolean {
        /*         if (prop.startsWith('_')) {
                  throw new Error('Нет досутпа');
                } */

        const clonedTarget: Props = JSON.parse(JSON.stringify(target));
        target[prop] = value;
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, clonedTarget, target);
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  // Проверить !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  // Проверить также
  _createDocumentFragment(): DocumentFragment {
    return new DocumentFragment();
  }

  // Откорректировать
  _addEvents(): void {
    const { events = [] } = this.props;

    events.forEach((element) => {
      const targetElement: HTMLElement = this._element.querySelector(`.${element.selector}`)!;
      /*       Object.keys(element.events).forEach((event: string): void => {
              targetElement.addEventListener(event, Reflect.get(element.events, event));
            }); */
      Object.entries(element.events).forEach(([key, handler]) => {
        targetElement.addEventListener(key, handler);
      });
    });

    /*     Object.keys(events).forEach((eventName) => {
          this._element.addEventListener(eventName, Reflect.get(events, eventName));
        }); */
  }

  _removeEvents(): void {
    const { events = [] } = this.props;

    events.forEach((element) => {
      const targetElement: HTMLElement = this._element.querySelector(`.${element.selector}`)!;
      /*       Object.keys(element.events).forEach((event) => {
              targetElement.removeEventListener(event, element.events[event]);
            }); */
      Object.entries(element.events).forEach(([key, handler]) => {
        targetElement.removeEventListener(key, handler);
      });
    });
  }
}

export default Block;
