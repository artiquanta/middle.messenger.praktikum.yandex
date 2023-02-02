import './Profile.css';
import template from './Profile.hbs';
import Block from '../../services/Block';
import Form from '../Form/Form';
import UploadPopup from '../UploadPopup/UploadPopup';
import { profileEvents, VALIDATION_ERRORS } from '../../utils/constants'
import FormValidator from '../../services/FormValidator';

type Props = {
  [key: string]: unknown
};

class Profile extends Block {
  constructor(props: Props) {
    const { personalForm, passwordForm, userInfo } = props;
    super({ userInfo, events: profileEvents });
    const profileBody = {};
    profileBody.personalForm = new Form({
      form: personalForm, events: [
        {
          selector: 'form',
          events: {
            submit: this.handlePersonalForm.bind(this),
          },
        },
      ], handleInput: this.handleInputChange.bind(this),
    });
    profileBody.passwordForm = new Form({
      form: passwordForm,
      events: [
        {
          selector: 'form',
          events: {
            submit: this.handlePasswordForm.bind(this),
          },
        },
      ], handleInput: this.handlePasswordChange.bind(this),
    });
    this.children.profileBody = profileBody;
    // this.children.popup = new UploadPopup({});
  }

  componentIsReady() {
    const profileContainer = this._element.querySelector('.profile__personal-container')!;
    const inputs = profileContainer.querySelectorAll('.form-input__input');
    const form1 = profileContainer.querySelector('form');
    const passwordContainer = this._element.querySelector('.profile__password-container')!;
    const inputs2 = passwordContainer.querySelectorAll('.form-input__input');
    const form2 = passwordContainer.querySelector('form');
    //const { first_name, second_name, display_name, login, email, phone } = this.props.userInfo;
    const { user } = this.props.userInfo;
    inputs.forEach((input) => {
      input.value = user[input.name];
    })
    this.validator = new FormValidator({ options: { form: form1, buttonSelector: 'form__button', inputErrorSelector: 'form-input__error' }, inputs });
    this.validator2 = new FormValidator({ options: { form: form2, buttonSelector: 'form__button', inputErrorSelector: 'form-input__error' }, inputs: inputs2 });
  }

  handlePersonalForm(evt) {
    // Запросить статус валидности полей, и через FormData сравнивать данные с имеющимися.
    // Обязательно сверять, если данные те же, что и были ранее
    evt.preventDefault();
    console.log(evt.target.closest('form').checkValidity())
    console.log(`данные пользователя`)
  }

  handlePasswordForm(evt) {
    evt.preventDefault();
    console.log('паролик')
  }

  handleInputChange(evt) {
    this.validator.handleChange(evt);
  }

  handlePasswordChange(evt) {
    // ставить состояние формы здесь?
   /*  const target = evt.target;
    const { name, value } = target;
    const form = document.forms.passwordForm;
    const newPassword = form.querySelector('input');
    if (name === 'repeat_password') {
      if (formElements.newPassword === value) {
        this.validator2._inputValidity['repeat_password'] = true;
        //evt.target.closest('label').querySelector('.form-input__error').textContent = '';
        console.log(document.forms.passwordForm.elements.repeat_password.value)
      } else {
        this.validator2._inputValidity['repeat_password'] = false;
        evt.target.closest('label').querySelector('.form-input__error').textContent = VALIDATION_ERRORS['REPEAT_PASSWORD_ERROR'];
      }
     //console.log(this.validator2._inputValidity);
    } else {
      this.validator2.handleChange(evt);
    } */
    this.validator2.handleChange(evt);
  }

  setFormValues() {
    /* const inputs = document.querySelectorAll('.form-input__input');
    console.log(inputs);
    inputs.forEach((input) => {
      //if (input.name === this.props.userInfo[input.name])
      console.log(input.name)
    }) */
  }

  render(): DocumentFragment {
    return this.compile(template, {
      user: this.props.userInfo,
    });
  }
}

export default Profile;
