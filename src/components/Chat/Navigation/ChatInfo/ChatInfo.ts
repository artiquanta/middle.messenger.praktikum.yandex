import './ChatInfo.css';
import template from './ChatInfo.hbs';
import Block from '../../../../services/Block/Block';

class ChatInfo extends Block {
  constructor() {
    super();
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatInfo;
