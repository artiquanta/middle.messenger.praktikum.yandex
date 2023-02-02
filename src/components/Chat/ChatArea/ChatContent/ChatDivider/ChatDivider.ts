import Block from '../../../../../services/Block';
import './ChatDivider.css';
import template from './ChatDivider.hbs';

class ChatDivider extends Block {
  constructor(props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { content: this.props.content });
  }
}

export default ChatDivider;
