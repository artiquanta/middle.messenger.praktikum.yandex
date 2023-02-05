import './VideoMessage.css';
import template from './VideoMessage.hbs';
import Block from '../../../../../../services/Block';

type Props = {
  content: string,
};

class VideoMessage extends Block {
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

export default VideoMessage;
