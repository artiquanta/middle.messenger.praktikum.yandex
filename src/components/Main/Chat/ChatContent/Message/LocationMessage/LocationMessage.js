import './LocationMessage.css';
import template from './LocationMessage.hbs';

function LocationMessage(content, user = false) {
  return template({ content, user });
}

export default LocationMessage;
