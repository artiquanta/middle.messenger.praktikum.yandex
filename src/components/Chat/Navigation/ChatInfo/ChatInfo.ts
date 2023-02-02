import Block from '../../../../services/Block';
import './ChatInfo.css';
import template from './ChatInfo.hbs';

type Props = {
  [key: string]: unknown
};

//function ChatInfo() {
class ChatInfo extends Block {
  constructor(props: Props) {
    super();
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatInfo;
