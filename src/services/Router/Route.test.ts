import { expect } from 'chai';
import Block from '../Block/Block';
import Route from './Route';

class TestBlock extends Block {
  functionResults: Record<string, boolean>;

  constructor(props: Props) {
    super(props);
    this.functionResults = {
      mount: true,
      isReady: false,
      unmount: false,
      getContent: false,
    };
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = '<div></div>';
    const element: HTMLElement = document.createElement('div');
    element.setAttribute('id', `${this.props.testId}`);
    template.content.firstElementChild!.replaceWith(element);
    return template.content;
  }
}

type Props = {
  [key in string]: any
};

describe('Services/Route', () => {
  function createRoute(): Route {
    return new Route(
      '/',
      TestBlock,
      {
        rootQuery: '.app',
        props: {
          testId: 'firstTestBlock',
        },
      },
    );
  }

  it('Экземпляр роута создаётся', () => {
    const route = createRoute();
    expect(route).to.be.instanceof(Route);
  });

  it('Происходит рендер блока', () => {
    const route = createRoute();
    route.render();
    expect(route._block).to.be.instanceof(Block);
  });

  it('Блок обнуляется при смене роута', () => {
    const route = createRoute();
    route.render();
    route.leave();
    expect(route._block).to.be.a('null');
  });
});
