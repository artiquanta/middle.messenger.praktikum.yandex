import { expect } from 'chai';
import Block from '../Block/Block';
import connect from './connect';
import { State } from '../../types/types';
import Store from './Store';

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

describe('Services/connect. Связывание хранилища с компонентом', () => {
  function createComponent(): Block {
    const ConnectedComponent = connect(TestBlock, (state: State) => ({
      testId: state.testId,
    }));

    return new ConnectedComponent({});
  }

  it('Функция создаёт анонимный экземпляр класса компонента Block', () => {
    const testBlock = createComponent();
    expect(testBlock).to.be.instanceof(Block);
  });

  it('Функция подписывает компонент на событие хранилища', () => {
    const testBlock = createComponent();
    Store.set('testId', 'testValue');
    const testValue = testBlock.props.testId;
    expect(testValue).to.be.a('string').that.equal('testValue');
  });
});
