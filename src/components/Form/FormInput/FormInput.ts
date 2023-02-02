import './FormInput.css';
import Block from '../../../services/Block';
import template from './FormInput.hbs';

type Props = {
  title: string,
  type: string,
  name: string,
  minLength: number,
  maxLength: number,
  required?: boolean,
};

class FormInput extends Block {
  constructor(props: Props) {
    const { type } = props;
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      input: this.props.input,
      isPassword: this.props.type === 'password',  // Если тип поля ввода - "пароль", будет добавлен дополнительный класс для такого поля
    });
  }
}

export default FormInput;
