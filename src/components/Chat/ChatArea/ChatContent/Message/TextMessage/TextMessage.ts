import Block from '../../../../../../services/Block/Block';
import './TextMessage.css';
import template from './TextMessage.hbs';

type Props = {
  content: string,
};

class TextMessage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(
      template,
      {
        content: this.props.content,
      },
    );
  }
}

export default TextMessage;
