import './Login.css';
import template from './Login.hbs';
import Form from '../Form/Form';

function Login(form) {
  return template({ form: Form(form) });
}

export default Login;
