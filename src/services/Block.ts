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
    READY: 'ready',
  };

  // Добавить did unmount, чтобы снимать слушателей событий
  // Разобраться с этим!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  _meta: Record<string, string | unknown>;
  _id: string;
  props: Props;
  children: Children;
  _eventBus: EventBus;
  _element: HTMLElement; // можно убрать. Возвращать documentFragment, навешивать ему события. Разделение на child'ов и props также убрать ввиду отсутствия необходимости
  _setUpdate: boolean = false;
  _test: Object = {};

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
    this._eventBus.on(Block.EVENTS.READY, this.componentIsReady.bind(this));
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
    if (Object.entries(this.children).length) {
      Object.values(this.children).forEach((child): void => {
        if (child instanceof Block) {

          child.dispatchComponentDidMount();
        } else {
          Object.values(child).forEach((childElement) => {
            if (Array.isArray(childElement)) {
              childElement.forEach((element => {
                element.dispatchComponentDidMount();
              }))
            } else {
              childElement.dispatchComponentDidMount();
            }
          })

        }

      })
    }



    /*     if (this.componentDidMount()) {
          Object.values(this.children).forEach((child): void => {
            child.dispatchComponentDidMount();
          })
        } */

  }

  componentIsReady() {
  }

  // Проверить
  componentDidMount(): boolean {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    return false;
  }

  // Проверить
  dispatchComponentDidMount(): void {
    //this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    /*  this._eventBus.emit(Block.EVENTS.FLOW_CDM);
     
  */
    //if (Object.keys(this.children).length) {
      console.log(`${this.constructor.name} - mount`)
      this._eventBus.emit(Block.EVENTS.FLOW_CDM);
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
      

      
    //}
  }

  // Раскомментированное содержимое
  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const isDifferent = JSON.stringify(oldProps) !== JSON.stringify(newProps);
    //const isDifferent = Object.keys(oldProps).some((prop: string): boolean => oldProps[prop] !== newProps[prop]);
    if (isDifferent) {
      if (this.componentDidUpdate(oldProps, newProps)) {
        this._render();
      } // убраны пропсы

    }
    //this.componentDidUpdate(oldProps, newProps); // вернуть пропсы в качестве аргументов
    //this._render();
    //}
  }

  // Также проверить. Возможно, убрать вызов.
  componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    return true;
  }

  /*   setProps(newProps: Props): void {
      if (!newProps) {
        return;
      }
  
      // Добавляем новые пропсы в объект с имеющимися пропсами
      Object.assign(this.props, newProps);
    }
   */
  // Типы проверить?, проверить функцию!!!!!!!! Проверять, если child - массив. Пройтись по каждому его элементу
  compile(template: (args?: Record<string, unknown>) => string, props: Record<string, unknown> = {}): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = { ...props };
    //console.warn(this.constructor.name)

    // console.log(`${this.constructor.name} - ${Object.keys(this.children).length}`);


    /*     function createStub(block: Record<string, Block | []>) {
          Object.entries(block).forEach(([key, child]: [string, Block | []]): void => {
            if (Array.isArray(child)) {
              const tempArray: string[] = [];
              child.forEach((element: Block) => {
                tempArray.push(`<div data-id="${element._id}"></div>`);
              });
              propsAndStubs[key] = tempArray;
            } else {
              propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
            }
          })
        } */

    Object.entries(this.children).forEach(([key, child]: [string, Block | []]): void => {
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
        Object.entries(child).forEach(([key, child]: [string, Block | []]): void => {
          if (Array.isArray(child)) {
            const tempArray: string[] = [];
            child.forEach((element: Block) => {
              tempArray.push(`<div data-id="${element._id}"></div>`);
            });
            propsAndStubs[key] = tempArray;
          } else {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
          }
        })
      }
    })
    /*     function fillStub(block) {
          Object.entries(block).forEach(([key, child]: [string, Block | []]): void => {
            if (Array.isArray(child)) {
              child.forEach((element: Block) => {
                const stub: HTMLElement = fragment.content.querySelector(`[data-id="${element._id}"]`)!;
                stub.replaceWith(element.getContent());
              })
            } else {
              const stub: HTMLElement = fragment.content.querySelector(`[data-id="${child._id}"]`)!;
              stub.replaceWith(child.getContent());
            }
          })
        } */






    /* 
        Object.values(this.children).forEach((child) => {
          if (child instanceof Block) {
            createStub(child);
          }
        })
        if (Object.values(this.children) instanceof Block) {
          createStub(this.children);
    
        } else {
          Object.values(this.children).forEach((testElement) => {
            createStub(testElement);
           });
        }; */

    /*   Object.entries(testElement).forEach(([key, child]: [string, Block | []]): void => {
        if (Array.isArray(child)) {
          const tempArray: string[] = [];
          child.forEach((element: Block) => {
            tempArray.push(`<div data-id="${element._id}"></div>`);
          });
          propsAndStubs[key] = tempArray;
        } else {
          propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        }
      }) */

    const fragment: HTMLTemplateElement = this._createDocumentElement('template');
    fragment.innerHTML = template(propsAndStubs);

    //console.log(fragment.innerHTML)
    // console.info(this.constructor.name)
    //console.log(fragment.innerHTML)
    // console.log(propsAndStubs)
    //console.info('------------')

    /*     Object.values(this.children).forEach((child: Block): void => {
          const stub: HTMLElement = fragment.content.querySelector(`[data-id="${child._id}"]`)!;
          stub.replaceWith(child.getContent());
        }); */
    // console.log(`${this.constructor.name} - ${Object.keys(this.children).length}`);




    Object.entries(this.children).forEach(([key, child]: [string, Block | []]): void => {
      if (child instanceof Block) {
        if (Array.isArray(child)) {
          child.forEach((element: Block) => {
            const stub: HTMLElement = fragment.content.querySelector(`[data-id="${element._id}"]`)!;
            stub.replaceWith(element.getContent());
          })
        } else {
          const stub: HTMLElement = fragment.content.querySelector(`[data-id="${child._id}"]`)!;
          stub.replaceWith(child.getContent());
        }
      } else {
        Object.entries(child).forEach(([key, child]: [string, Block | []]): void => {
          if (Array.isArray(child)) {
            child.forEach((element: Block) => {
              const stub: HTMLElement = fragment.content.querySelector(`[data-id="${element._id}"]`)!;
              stub.replaceWith(element.getContent());
            })
          } else {
            const stub: HTMLElement = fragment.content.querySelector(`[data-id="${child._id}"]`)!;
            if (!stub) {
              console.error('asdasdasdasd')
            } else {
              stub.replaceWith(child.getContent());
            }

          }
        })
      }
    })



    /*     if (Object.keys(this.children)) {
          console.warn(Object.values(this.children));
          Object.values(this.children).forEach((testElement) => fillStub(testElement));
        } else {
          console.warn(Object.entries(this.children));
          fillStub(this.children);
        }; */
    // массив целимком добавляется. Нужно как-то убрать запятые
    // console.log(fragment.content)

    // Попытка реализации через precompile без compile Handlebars
    return fragment.content;
  }

  // Возможно, можно убрать использование this._element ----------------------------------------------------
  /*   getElement(): HTMLElement {
      return this._element;
    }
   */
  _render(): void {
    //console.warn(`${this.constructor.name} - рендер.`)
    //this._element.innerHTML = '';
    this._element = this.render();
    // const block = this.render();
    this._removeEvents();
    /* this._element.appendChild(block); */
    this._addEvents();
    //console.log(`${this.constructor.name} - redner`)
  }

  // ?
  render(): any { }

  getContent(): HTMLElement {
    //this.componentIsReady();
    this._eventBus.emit(Block.EVENTS.READY)
    return this._element;
  }

  setProps(newProps: Props) {
    if (!newProps) {
      return;
    }

    this._setUpdate = false;
    const oldProps: Props = JSON.parse(JSON.stringify(this.props));
    const { children, props } = this._getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
      this._setUpdate = false;
    }
  }

  // Переделать, чтобы рендерить не каждый пропс!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! и посмотреть на eventbus
  _makePropsProxy(props: Props): Props {
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
          this._setUpdate = true;
          self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        }
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
    //console.log(events)

    events.forEach((element) => {
      const targetElement: HTMLElement = this._element.querySelector(`.${element.selector}`)!;
      if (targetElement) {
        Object.entries(element.events).forEach(([key, handler]) => {
          targetElement.addEventListener(key, handler);
        });
      }
      //console.log(targetElement)
      /*       Object.keys(element.events).forEach((event: string): void => {
              targetElement.addEventListener(event, Reflect.get(element.events, event));
            }); */

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
      if (targetElement) {
        Object.entries(element.events).forEach(([key, handler]) => {
          targetElement.removeEventListener(key, handler);
        });
      }

    });
  }
}

export default Block;
