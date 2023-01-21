import './Register.css';
import template from './Register.hbs';
import Form from '../Form/Form';

function Register(form) {
  return template({ form: Form(form) });
}

export default Register;
