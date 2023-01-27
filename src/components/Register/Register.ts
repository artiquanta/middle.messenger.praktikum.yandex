import './Register.css';
import template from './Register.hbs';
import Form from '../Form/Form';
import Block from '../../services/Block';

type Props = {
  [key: string]: unknown
};

class Register extends Block {
  constructor(props: Props) {
    super(props);
    this.children.form = new Form({form});
  };

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Register;
