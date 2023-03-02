import Block from '../Block';

import { Indexed } from '../../types/types';

class Route {
  _pathname: string;

  _blockClass;

  _block: Block | null = null;

  _props: Indexed;

  constructor(pathname: string, view: typeof Block, props: Indexed) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  leave(): void {
    if (this._block) {
      this._block.dispatchComponentDidUnmount();
      this._block = null;
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render() {
    this._block = new (this._blockClass as any)(this._props.props);
    const selector = this._props.rootQuery as string;
    const root: HTMLElement = document.querySelector(selector)!;
    const { children } = root;

    if (children.length > 1) {
      const secondChild = children[1];
      secondChild.replaceWith(this._block!.getContent());
    } else {
      root.appendChild(this._block!.getContent());
    }

    this._block!.dispatchComponentDidMount();
  }
}

export default Route;
