import './TextMessage.css';
import template from './TextMessage.hbs';

function TextMessage(content) {
  return template({ content });
}

export default TextMessage;
