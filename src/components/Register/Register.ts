import './Register.css';
import template from './Register.hbs';
import Form from '../Form/Form';
import Block from '../../services/Block';

type Props = {
  [key: string]: unknown
};

class Register extends Block {
  _onRegister: Function;

  constructor(props: Props) {
    const { registerForm, onRegister } = props;
    super();
    this.children.form = new Form({
      form: registerForm,
      events: [
        {
          selector: 'form',
          events: {
            submit: this.handleForm.bind(this),
          }
        }
      ]
    });

    this._onRegister = onRegister;
  };

  handleForm(evt) {
    evt.preventDefault();
    const formData = {};
    const data = new FormData(evt.target);
    for (let [key, value] of data) {
      formData[key] = value;
    };
    //onLogin(formData);
    this._onRegister(formData);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Register;
