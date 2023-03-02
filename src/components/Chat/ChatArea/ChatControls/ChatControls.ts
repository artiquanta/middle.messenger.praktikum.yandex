import './ChatControls.css';
import template from './ChatControls.hbs';
import Block from '../../../../services/Block';
import FormValidator from '../../../../services/FormValidator';
import MessageForm from './MessageForm/MessageForm';
import PopupAttach from './PopupAttach/PopupAttach';
import { CallBack, EventType } from '../../../../types/types';

type Props = {
  events?: EventType[],
  onSendMessage: CallBack,
};

class ChatControls extends Block {
  private _validator: FormValidator;

  constructor(props: Props) {
    super(props);

    const chatControlsBody: Record<string, Block> = {};

    chatControlsBody.popup = new PopupAttach({});
    chatControlsBody.form = new MessageForm({
      events: [
        {
          selector: 'message-form',
          events: {
            submit: this.handleFormSubmit.bind(this),
          },
        },
        {
          selector: 'message-form__textarea',
          events: {
            input: this._handleInput.bind(this),
            keydown: (evt: Event) => { // Отправка сообщения сочетанием клавиш "Shift + Enter"
              const { key, shiftKey }: { key: string, shiftKey: boolean } = evt as KeyboardEvent;
              if (key === 'Enter' && shiftKey) {
                evt.preventDefault();
                this.handleFormSubmit(evt);
              }
            },
          },
        },
      ],
    });

    // Добавление дочерних компонентов
    this.children.chatControlsBody = chatControlsBody;
  }

  // Подключение валидатора после монтирования компонента
  _componentIsReady() {
    this._validator = new FormValidator(
      {
        options: {
          withButton: true,
          withTextError: false,
        },
        formData:
        {
          formName: 'message-form',
          buttonSelector: 'message-form__send-btn',
          inputErrorClass: 'message-form_textarea_type_error',
        },
      },
    );
  }

  handleFormSubmit(evt: Event) {
    evt.preventDefault();

    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validator.submitValidation();
    if (isFormValid) {
      // Если тип события - Keydown, получаем ссылку на форму через target.form
      const data = target.form ? new FormData(target.form) : new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк компонента App
      this.props.onSendMessage(formData);

      // Очистка содержимого формы
      if (target instanceof HTMLTextAreaElement && target.form) {
        this._inputReset(target);
      } else {
        this._inputReset(target.message);
      }
    }
  }

  // Очистка поля ввода
  private _inputReset(input: HTMLTextAreaElement) {
    const inputElement = input;
    inputElement.value = '';
    inputElement.style.height = 'auto';
  }

  private _handleInput(evt: Event) {
    const target = evt.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    this._validator.handleInputChange(evt);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatControls;
