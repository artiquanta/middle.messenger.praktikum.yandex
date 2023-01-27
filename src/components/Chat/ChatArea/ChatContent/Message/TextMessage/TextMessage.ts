import Block from '../../../../../../services/Block';
import './TextMessage.css';
import template from './TextMessage.hbs';

type Props = {
  [key: string]: unknown
};

//function TextMessage(content) {
class TextMessage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { content: this.props.content });
  }
}

export default TextMessage;
