import Block from '../../../services/Block';
import './FormInput.css';
import template from './FormInput.hbs';

type Props = {
  [key: string]: unknown
};

class FormInput extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      input: this.props.input,
      isPassword: this.props.input.type === 'password',
    })
  }
}

export default FormInput;
