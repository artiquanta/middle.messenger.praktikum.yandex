import './PhotoMessage.css';
import template from './PhotoMessage.hbs';

function PhotoMessage(content, user = false) {
  return template({ content });
}

export default PhotoMessage;
