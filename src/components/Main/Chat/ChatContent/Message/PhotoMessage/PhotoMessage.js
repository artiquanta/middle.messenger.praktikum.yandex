import './PhotoMessage.css';
import template from './PhotoMessage.hbs';

function PhotoMessage(content) {
  return template({ content });
}

export default PhotoMessage;
