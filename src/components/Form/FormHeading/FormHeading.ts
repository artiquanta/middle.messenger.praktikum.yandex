import './FormHeading.css';
import template from './FormHeading.hbs';
import Block from '../../../services/Block';

type Props = {
  heading: string,
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
