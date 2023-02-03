import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

type Props = {
  [key: string]: any,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

type Children = Record<string, Block | Record<string, Block | Block[]>>;

type CompileTemplate = (args?: Record<string, unknown>) => string;
type CompileProps = Record<string, unknown>;

class Block {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    READY: 'ready',
  };

  _id: string;

  props: Props;

  children: Children;

  _eventBus: EventBus;

  _element: HTMLElement;

  _setUpdate: boolean = false;

  _test: Object = {};

  constructor(props: Props = {}) {
    // Инциализация EventBus
    this._eventBus = new EventBus();

    // Генерация уникального ID для компонента
    this._id = makeUUID();

    // Проксирование props и children
    this.props = this._makePropsProxy({ ...props, _id: this._id });
    this.children = this._makePropsProxy({}) as Children;

    // Подписка на события
    this._registerEvents();

    // Инициализация блока
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  // Подписка на события
  _registerEvents(): void {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    this._eventBus.on(Block.EVENTS.READY, this.componentIsReady.bind(this));
  }

  // Инициализация блока
  init(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // Для каждого дочернего компонента вызываем ComponentDidMount
  _componentDidMount(): void {
    // Если дочерние компоненты присутствуют
    if (Object.entries(this.children).length) {
      // Обрабатываем их
      Object.values(this.children).forEach((child): void => {
        // Если дочерний элемент является экземпляром блока
        if (child instanceof Block) {
          child.dispatchComponentDidMount();
        } else {
          // Иначе - это объект с дочерними компонентами
          Object.values(child).forEach((childElement) => {
            // Проверяем, если элемент - массив компонентов
            if (Array.isArray(childElement)) {
              childElement.forEach((element) => {
                element.dispatchComponentDidMount();
              });
            } else {
              childElement.dispatchComponentDidMount();
            }
          });
        }
      });
    }
  }

  // Вызывается, когда компонент смонтирован
  componentIsReady(): void { }

  componentDidMount(): boolean {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    return true;
  }

  dispatchComponentDidMount(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const isDifferent = JSON.stringify(oldProps) !== JSON.stringify(newProps);
    if (isDifferent) {
      if (this.componentDidUpdate(oldProps, newProps)) {
        this._render();
      }
    }
  }

  componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    const isDifferent = JSON.stringify(oldProps) !== JSON.stringify(newProps);
    if (isDifferent) {
      return true;
    }
    return true;
  }

  compile(template: CompileTemplate, props: CompileProps = {}): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = { ...props };

    // Для каждого дочернего элемента создаётся временная заглушка
    Object.entries(this.children)
      .forEach(([key, child]: [string, Block | Record<string, Block | Block[]>]): void => {
        if (child instanceof Block) {
          if (Array.isArray(child)) {
            const tempArray: string[] = [];
            child.forEach((element: Block) => {
              tempArray.push(`<div data-id="${element._id}"></div>`);
            });
            propsAndStubs[key] = tempArray;
          } else {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
          }
        } else {
          Object.entries(child)
            .forEach(([childKey, childElement]: [string, Block | Block[]]): void => {
              if (Array.isArray(childElement)) {
                const tempArray: string[] = [];
                childElement.forEach((element: Block) => {
                  tempArray.push(`<div data-id="${element._id}"></div>`);
                });
                propsAndStubs[childKey] = tempArray;
              } else {
                propsAndStubs[childKey] = `<div data-id="${childElement._id}"></div>`;
              }
            });
        }
      });

    // Создаём Template-элемент
    const fragment: HTMLTemplateElement = this._createDocumentElement('template');
    fragment.innerHTML = template(propsAndStubs);

    // Заменяем заглушки на дочерние компоненты
    Object.values(this.children)
      .forEach((child: Block | Record<string, Block | Block[]>): void => {
        if (child instanceof Block) {
          if (Array.isArray(child)) {
            child.forEach((element: Block) => {
              const stub: HTMLElement = fragment.content.querySelector(`[data-id="${element._id}"]`)!;
              stub.replaceWith(element.getContent());
            });
          } else {
            const stub: HTMLElement = fragment.content.querySelector(`[data-id="${child._id}"]`)!;
            stub.replaceWith(child.getContent());
          }
        } else {
          Object.values(child)
            .forEach((childElement: Block | Block[]): void => {
              if (Array.isArray(childElement)) {
                childElement.forEach((element: Block) => {
                  const stub: HTMLElement = fragment.content.querySelector(`[data-id="${element._id}"]`)!;
                  stub.replaceWith(element.getContent());
                });
              } else {
                const stub: HTMLElement = fragment.content.querySelector(`[data-id="${childElement._id}"]`)!;
                if (stub) {
                  stub.replaceWith(childElement.getContent());
                }
              }
            });
        }
      });

    // Вовзращаем DocumentFragment
    return fragment.content;
  }

  _render(): void {
    this._element = this.render();
    this._removeEvents();
    this._addEvents();
  }

  render(): any { }

  getContent(): HTMLElement {
    setTimeout(() => this._eventBus.emit(Block.EVENTS.READY), 1);
    return this._element;
  }

  // Изменение пропсов блока
  setProps(newProps: Props): void {
    if (!newProps) {
      return;
    }

    this._setUpdate = false;
    const oldProps: Props = JSON.parse(JSON.stringify(this.props));

    if (Object.values(newProps).length) {
      Object.assign(this.props, newProps);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
      this._setUpdate = false;
    }
  }

  _makePropsProxy(props: Props): Props {
    /* eslint no-param-reassign: "off" */
    const self: this = this;
    return new Proxy(props, {
      get(target, prop: string): boolean {
        const value: unknown = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: unknown): boolean {
        const oldTarget: Props = JSON.parse(JSON.stringify(target));
        if (target[prop] !== value) {
          target[prop] = value;
          self._setUpdate = true;
          self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        }
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  // Добавление слушателей событий
  _addEvents(): void {
    const { events = [] } = this.props;

    events.forEach((element) => {
      const targetElement: HTMLElement = this._element.querySelector(`.${element.selector}`)!;
      if (targetElement) {
        Object.entries(element.events).forEach(([key, handler]) => {
          targetElement.addEventListener(key, handler);
        });
      }
    });
  }

  // Удаление слушателей событий
  _removeEvents(): void {
    const { events = [] } = this.props;

    events.forEach((element) => {
      const targetElement: HTMLElement = this._element.querySelector(`.${element.selector}`)!;
      if (targetElement) {
        Object.entries(element.events).forEach(([key, handler]) => {
          targetElement.removeEventListener(key, handler);
        });
      }
    });
  }
}

export default Block;
