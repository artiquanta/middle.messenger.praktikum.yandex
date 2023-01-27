import './Login.css';
import template from './Login.hbs';
import Form from '../Form/Form';
import Block from '../../services/Block';

type Props = {
  [key: string]: unknown
};

class Login extends Block {
  constructor(props: Props) {
    super(props);
    this.children.form = new Form({form: loginform});
  }

  render() {
    return this.compile(template);
  }
}

export default Login;
