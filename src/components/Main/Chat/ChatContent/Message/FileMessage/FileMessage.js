import './FileMessage.css';
import template from './FileMessage.hbs';

function FileMessage({ value, fileName, user = false }) {
  return template({ value, fileName, user });
}

export default FileMessage;
