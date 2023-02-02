import Block from '../../../services/Block';
import './ChatStub.css';
import template from './ChatStub.hbs';

type Props = {
  [key: string]: unknown
};

//function ChatStub() {
class ChatStub extends Block {
  constructor(props: Props) {
    super();
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatStub;
