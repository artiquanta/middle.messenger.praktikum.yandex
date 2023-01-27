import Block from '../../services/Block';
import './UploadPopup.css';
import template from './UploadPopup.hbs';

type Props = {
  [key: string]: unknown
};

class UploadPopup extends Block {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return this.compile(template, { title: this.props.title, hint: this.props.hint, button: this.props.button });
  }
}

export default UploadPopup;
