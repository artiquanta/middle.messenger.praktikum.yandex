import './PhotoMessage.css';
import template from './PhotoMessage.hbs';
import Block from '../../../../../../services/Block/Block';

type Props = {
  content: string,
};

class PhotoMessage extends Block {
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

export default PhotoMessage;
