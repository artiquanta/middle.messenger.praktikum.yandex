import Block from '../../../../../../services/Block';
import './VideoMessage.css';
import template from './VideoMessage.hbs';

//function VideoMessage(content) {
class VideoMessage extends Block {
  constructor(props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { content: this.props.content });
  }
}

export default VideoMessage;
