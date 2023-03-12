import { expect } from 'chai';
import Block from '../Block/Block';
import FormValidator from './FormValidator';
import { form } from '../../utils/testsData';

type Props = {
  [key in string]: any
};

class TestBlock extends Block {
  functionResults: Record<string, boolean>;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = form;
    return template.content;
  }
}

describe('Services/FormValidator. Валидатор формы', () => {
  const testBlock = new TestBlock({});
  const root = document.getElementById('app')!;
  root.appendChild(testBlock.getContent());

  function connectValidator(): FormValidator {
    return new FormValidator({
      options: {
        withButton: true,
        withTextError: true,
      },
      formData:
      {
        formName: 'loginForm',
        buttonSelector: 'form__button',
        inputErrorTextSelector: 'form-input__error',
        inputErrorClass: 'form-input__input_type_error',
      },
    });
  }

  it('Валидатор находит форму и проводит первичную валидацию', () => {
    const validator = connectValidator();
    expect(validator.getValidationState()).to.deep.include({
      login: false,
      password: false,
    });
  });

  it('Валидатор вовзращает состояние валидации формы', () => {
    const validator = connectValidator();
    expect(validator.submitValidation()).to.be.a('boolean').that.equal(false);
  });
});
