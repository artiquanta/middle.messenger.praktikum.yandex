import './VideoMessage.css';
import template from './VideoMessage.hbs';

function VideoMessage(content) {
  return template({ content });
}

export default VideoMessage;
