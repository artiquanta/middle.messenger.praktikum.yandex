import { expect } from 'chai';
import Block from './Block';

type Props = {
  [key in string]: any
};

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

  _componentIsReady() {
    this.functionResults.isReady = true;
  }

  componentDidMount() {
    this.functionResults.mount = true;
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return super.componentDidUpdate(oldProps, newProps);
  }

  componentDidUnmount() {
    this.functionResults.unmount = true;
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = '<div></div>';
    const element: HTMLElement = document.createElement('div');
    element.setAttribute('id', 'test');
    template.content.firstElementChild!.replaceWith(element);
    return template.content;
  }
}

describe('Services/Block. Проверить функциональность Block', () => {
  function createComponent({ ...options }) {
    return new TestBlock({ ...options });
  }

  it('Экземпляр блока успешно создаётся', () => {
    const testBlock = createComponent({});
    expect(testBlock.props._id).to.be.an('string').that.length(36);
  });

  it('Компонент монтируется', () => {
    const testBlock = createComponent({});
    expect(testBlock.functionResults.mount).to.be.an('boolean').that.equal(true);
  });

  it('Компонент обновляется', () => {
    const testBlock = createComponent({ test: 'old' });
    testBlock.setProps({ test: 'new' });
    expect(testBlock.props.test).to.be.an('string').that.equal('new');
  });

  it('Элемент компонента добавляется в DOM, готов к использованию', () => {
    const testBlock = createComponent({});
    const root = document.getElementById('app')!;
    root.appendChild(testBlock.getContent());
    setTimeout(() => {
      expect(testBlock.functionResults.isReady).to.be.an('boolean').that.equal(true);
    }, 1);
  });

  it('Компонент размонтируется', () => {
    const testBlock = createComponent({});
    testBlock.componentDidUnmount();
    expect(testBlock.functionResults.unmount).to.be.an('boolean').that.equal(true);
  });
});
