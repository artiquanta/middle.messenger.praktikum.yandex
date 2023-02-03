import './ChatStub.css';
import template from './ChatStub.hbs';
import Block from '../../../services/Block';

type Props = {
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class ChatStub extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatStub;
