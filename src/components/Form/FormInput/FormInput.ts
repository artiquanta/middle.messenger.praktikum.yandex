import './FormInput.css';
import template from './FormInput.hbs';
import Block from '../../../services/Block/Block';

type Props = {
  input: {
    title: string,
    type: string,
    name: string,
    minLength: number,
    maxLength: number,
    required?: boolean,
  },
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class FormInput extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      input: this.props.input,
      // Если тип поля ввода - "пароль", будет добавлен дополнительный класс для такого поля
      isPassword: this.props.input.type === 'password',
    });
  }
}

export default FormInput;
