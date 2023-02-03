import './FormLink.css';
import template from './FormLink.hbs';
import Block from '../../../services/Block';

type Props = {
  link: {
    url: string,
    title: string,
  },
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
