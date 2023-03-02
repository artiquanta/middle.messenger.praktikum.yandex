import './FileMessage.css';
import template from './FileMessage.hbs';
import Block from '../../../../../../services/Block';
import { BASE_RESOURCE_URL } from '../../../../../../utils/constants';

type Props = {
  content: string,
  fileName: string,
};

class FileMessage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      value: `${BASE_RESOURCE_URL}/${this.props.content}`,
      fileName: this.props.fileName,
    });
  }
}

export default FileMessage;
