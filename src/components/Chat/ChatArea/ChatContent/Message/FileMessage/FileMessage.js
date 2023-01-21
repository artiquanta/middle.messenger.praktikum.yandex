import './FileMessage.css';
import template from './FileMessage.hbs';

function FileMessage({ value, fileName }) {
  return template({ value, fileName });
}

export default FileMessage;
