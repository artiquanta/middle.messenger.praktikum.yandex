import Block from '../../../../../../services/Block';
import './FileMessage.css';
import template from './FileMessage.hbs';

//function FileMessage({ value, fileName }) {
class FileMessage extends Block {
  constructor(props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      value: this.props.value,
      fileName: this.props.fileName,
    });
  }
}

export default FileMessage;
