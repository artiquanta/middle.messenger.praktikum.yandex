import './VideoMessage.css';
import template from './VideoMessage.hbs';

function VideoMessage(content, user = false) {
  return template({ content, user });
}

export default VideoMessage;
