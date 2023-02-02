import Block from '../../../services/Block';
import './FormHeading.css';
import template from './FormHeading.hbs';

type Props = {
  [key: string]: unknown
};

class FormHeading extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { heading: this.props.heading });
  }
}

export default FormHeading;
