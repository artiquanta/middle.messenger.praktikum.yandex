import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';
import isEqual from '../utils/isEqual';
import cloneDeep from '../utils/deepClone';
import {
  CompileTemplate,
  CompileProps,
  EventType,
} from '../types/types';

type Props = {
  [key: string]: any,
  events?: EventType[],
};

type Children = Record<string, Block | Block[] | Record<string, Block | Block[]>>;

type ChildBlockItem = Block | Block[] | Record<string, Block | Block[]>;

abstract class Block {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_UNMOUNT: 'flow:component-did-unmount',
    FLOW_RENDER: 'flow:render',
    READY: 'ready',
  };

  private _id: string;

  public props: Props;

  public children: Children;

  private _eventBus: EventBus;

  private _element: HTMLElement;

  private _setUpdate: boolean = false;

  constructor(props: Props = {}) {
    // Инциализация EventBus
    this._eventBus = new EventBus();

    // Генерация уникального ID для компонента
    this._id = makeUUID();

    // Проксирование props и children
    this.props = this._makePropsProxy({ ...props, _id: this._id });
    this.children = this._makeChildrenProxy({}) as Children;

    // Подписка на события
    this._registerEvents();

    // Инициализация блока
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  // Подписка на события
  private _registerEvents(): void {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_UNMOUNT, this._componentDidUnmount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    this._eventBus.on(Block.EVENTS.READY, this._componentIsReady.bind(this));
  }

  // Инициализация блока
  init(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // Для каждого дочернего компонента вызываем ComponentDidMount
  private _componentDidMount(): void {
    if (Object.entries(this.children).length > 0) {
      Object.values(this.children).forEach((child) => {
        if (child instanceof Block) {
          child.dispatchComponentDidMount();
        } else if (Array.isArray(child)) {
          child.forEach((childElement) => {
            childElement.dispatchComponentDidMount();
          });
        } else {
          Object.values(child).forEach((childElement) => {
            if (childElement instanceof Block) {
              childElement.dispatchComponentDidMount();
            } else if (Array.isArray(childElement)) {
              childElement.forEach((childArrayElement) => {
                childArrayElement.dispatchComponentDidMount();
              });
            }
          });
        }
      });
    }
  }

  componentDidMount(): void { }

  dispatchComponentDidMount(): void {
    this.componentDidMount();
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  // Вызывается, когда компонент смонтирован
  _componentIsReady(): void { }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this._render();
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const isDifferent = !isEqual(oldProps, newProps);

    // Если пропсы отличаются - рендерим
    if (isDifferent) {
      return true;
    }
    return false;
  }

  dispatchComponentDidUpdate(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_CDU);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUnmount(): void {
    if (Object.entries(this.children).length > 0) {
      Object.values(this.children).forEach((child) => {
        if (child instanceof Block) {
          child.dispatchComponentDidUnmount();
        } else if (Array.isArray(child)) {
          child.forEach((childElement) => {
            childElement.dispatchComponentDidUnmount();
          });
        } else {
          Object.values(child).forEach((childElement) => {
            if (childElement instanceof Block) {
              childElement.dispatchComponentDidUnmount();
            } else if (Array.isArray(childElement)) {
              childElement.forEach((childArrayElement) => {
                childArrayElement.dispatchComponentDidUnmount();
              });
            }
          });
        }
      });
    }
  }

  // Размонтирование компонента
  componentDidUnmount() { }

  dispatchComponentDidUnmount(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_UNMOUNT);
    this.componentDidUnmount();
  }

  // Формирование шаблона
  compile(template: CompileTemplate, props: CompileProps = {}): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = { ...props };

    // Для каждого дочернего элемента создаётся временная заглушка
    Object.entries(this.children)
      .forEach(([key, child]: [string, ChildBlockItem]): void => {
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
        } else if (Array.isArray(child)) {
          const tempArray: string[] = [];
          child.forEach((element: Block) => {
            tempArray.push(`<div data-id="${element._id}"></div>`);
          });
          propsAndStubs[key] = tempArray;
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
      .forEach((child: ChildBlockItem): void => {
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
        } else if (Array.isArray(child)) {
          child.forEach((element: Block) => {
            const stub: HTMLElement = fragment.content.querySelector(`[data-id="${element._id}"]`)!;
            stub.replaceWith(element.getContent());
          });
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

  private _render(): void {
    if (this._element) {
      this._removeEvents();
    }
    const block: HTMLTemplateElement = this.render();
    this._addEvents(block);
    const element: Element = block.firstElementChild!;
    if (this._element) {
      this._element.replaceWith(element);
    }
    this._element = element as HTMLElement;
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
    const oldProps: Props = cloneDeep(this.props);

    if (Object.values(newProps).length) {
      Object.assign(this.props, newProps);
    }

    // Если пропсы отличаются - вызываем повторный рендер
    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
      this._setUpdate = false;
    }
  }

  // Proxy для Props
  private _makePropsProxy(props: Props): Props {
    /* eslint no-param-reassign: "off" */
    const self: this = this;
    return new Proxy(props, {
      get(target, prop: string): boolean {
        const value: unknown = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: unknown): boolean {
        if (target[prop] !== value) {
          target[prop] = value;
          self._setUpdate = true;
        }
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  // Proxy для Children
  private _makeChildrenProxy(props: Props): Props {
    /* eslint no-param-reassign: "off" */
    const self: this = this;
    return new Proxy(props, {
      get(target, prop: string): boolean {
        const value: unknown = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: unknown): boolean {
        const oldTarget: Props = cloneDeep(target);
        if (target[prop] !== value) {
          target[prop] = value;
          self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        }
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  // Добавление слушателей событий
  private _addEvents(block: HTMLElement = this._element): void {
    const { events = [] } = this.props;

    events.forEach((element) => {
      const targetElement: HTMLElement = block.querySelector(`.${element.selector}`)!;
      if (targetElement) {
        Object.entries(element.events).forEach(([key, handler]) => {
          targetElement.addEventListener(key, handler);
        });
      }
    });
  }

  // Удаление слушателей событий
  private _removeEvents(): void {
    const { events = [] } = this.props;

    events.forEach((element) => {
      const targetElement: HTMLElement = this._element.querySelector(`.${element.selector}`)!;
      if (targetElement) {
        Object.entries(element.events).forEach(([key, handler]) => {
          targetElement.removeEventListener(key, handler);
        });
      } else {
        const currentTarget: HTMLElement = this._element!.parentNode!.querySelector(`.${element.selector}`)!;
        if (currentTarget) {
          Object.entries(element.events).forEach(([key, handler]) => {
            currentTarget.removeEventListener(key, handler);
          });
        }
      }
    });
  }
}

export default Block;
