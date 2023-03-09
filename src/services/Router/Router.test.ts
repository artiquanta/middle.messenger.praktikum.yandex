import { expect } from 'chai';
import Block from '../Block/Block';
import Router from './Router';
import Route from './Route';

type Props = {
  [key in string]: any
};

class TestBlock extends Block {
  functionResults: Record<string, boolean>;

  constructor(props: Props) {
    super(props);
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

describe('Services/Router', () => {
  const router = new Router('.app');

  it('Возвращает ранее созданный экземляр (Singleton)', () => {
    expect(Router.getInstance()).to.be.not.a('null').that.equal(Route);
  });

  it('Маршрут добавляется', () => {
    router
      .use('/', TestBlock, {
        testId: 'firstTestBlock',
      })
      .use('/test', TestBlock, {
        testId: 'secondTestBlock',
      })
      .start();

    expect(router.getRoute('/')).to.be.an.instanceof(Route);
  });

  it('Получение роута по маршруту', () => {
    expect(router.getRoute('/')).to.be.an.instanceof(Route);
  });

  it('Переход на страницу по ссылке', () => {
    router.go('/test');
    const newElement = document.getElementById('secondTestBlock')!;
    expect(newElement).to.be.not.a('null');
  });
});
