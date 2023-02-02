import './Login.css';
import template from './Login.hbs';
import Form from '../Form/Form';
import Block from '../../services/Block';
import FormValidator from '../../services/FormValidator';

type Props = {
  [key: string]: unknown
};

class Login extends Block {
  _onLogin: Function;
  _history: Function;

  constructor(props: Props) {
    const { loginForm, onLogin, history } = props;
    super();
    this.children.form = new Form({
      form: loginForm,
      events: [
        {
          selector: 'form',
          events: {
            submit: this.handleForm.bind(this),
          }
        }
      ], handleInput: this.handleInput.bind(this),
    });
    //console.log(on)
    this._onLogin = onLogin;
    this._history = history;
    console.log(history)
  }
  componentIsReady() {
    const form = this._element.querySelector('form');
    const inputs = form.querySelectorAll('.form-input__input');
    this.validator = new FormValidator({ options: { form: form, buttonSelector: 'form__button', inputErrorSelector: 'form-input__error' }, inputs });
  }

  handleInput(evt) {
    if (evt.type === 'input') {
      this.validator.handleChange(evt);
    }
    if (evt.type === 'focus') {

    }

    if (evt.type === 'blur') {
      
    }

  }

  handleForm(evt) {
    evt.preventDefault();
    const formData = {};
    const data = new FormData(evt.target);
    for (let [key, value] of data) {
      formData[key] = value;
    };
    //onLogin(formData);
    this._onLogin(formData);
    this._history('./signup');
  }

  render() {
    return this.compile(template);
  }
}

export default Login;
