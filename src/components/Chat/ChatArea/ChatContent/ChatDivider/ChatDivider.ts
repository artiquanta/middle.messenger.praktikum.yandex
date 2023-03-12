import './ChatDivider.css';
import template from './ChatDivider.hbs';
import Block from '../../../../../services/Block/Block';

type Props = {
  content: string,
};

class ChatDivider extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { content: this.props.content });
  }
}

export default ChatDivider;
