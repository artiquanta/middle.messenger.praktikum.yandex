import Block from '../../../../../../services/Block';
import './PhotoMessage.css';
import template from './PhotoMessage.hbs';

type Props = {
  [key: string]: unknown
};

//function PhotoMessage(content) {
class PhotoMessage extends Block {
  constructor(props: Props) {
    super(props);
  }
  render(): DocumentFragment {
    return this.compile(template, { content: this.props.content });
  }
}

export default PhotoMessage;
