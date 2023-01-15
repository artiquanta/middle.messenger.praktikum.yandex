import './TextMessage.css';
import template from './TextMessage.hbs';

function TextMessage( content, user = false ) {
  return template({ content });
}

export default TextMessage;
