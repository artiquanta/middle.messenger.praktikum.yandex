import './Form.css';
import template from './Form.hbs';
import Block from '../../services/Block/Block';
import FormHeading from './FormHeading/FormHeading';
import FormInput from './FormInput/FormInput';
import FormLink from './FormLink/FormLink';
import { Props, Input, FormElements } from './Form.type';
import FormError from './FormError/FormError';

class Form extends Block {
  _propsForm: FormElements;

  constructor(props: Props) {
    const {
      form,
      events,
      handleInput,
    } = props;
    super({ form: form.form, events });

    const formBody: Record<string, Block | Block[]> = {};
    this._propsForm = form.form as FormElements;

    // Добавление заголовка формы при необходимости
    if (this._propsForm.heading) {
      formBody.heading = new FormHeading({ heading: this._propsForm.heading });
    }
    // Добавление ссылки в форму при необходимости
    if (this._propsForm.link) {
      formBody.link = new FormLink({ link: this._propsForm.link });
    }

    // Создание инпутов
    formBody.inputsList = form.inputs.map((input: Input) => new FormInput({
      input,
      events: [
        {
          selector: 'form-input__input',
          events: {
            blur: handleInput,
            input: handleInput,
          },
        },
      ],
    }));

    formBody.formError = new FormError({});

    // Добавление дочерних компонентов
    this.children.formBody = formBody;
  }

  render(): DocumentFragment {
    return this.compile(template, {
      buttonTitle: this.props.form.buttonTitle,
      formId: this.props.form.id,
    });
  }
}

export default Form;
