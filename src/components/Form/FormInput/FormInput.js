import './FormInput.css';
import template from './FormInput.hbs';

function FormInput(input) {
  const isPassword = input.type === 'password';
  return template({ input, isPassword });
}

export default FormInput;
