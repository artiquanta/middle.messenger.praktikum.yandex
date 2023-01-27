import Block from '../../../services/Block';
import './FormLink.css';
import template from './FormLink.hbs';

type Props = {
  [key: string]: unknown
};

class FormLink extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { link: this.props.link });
  }
}

export default FormLink;
