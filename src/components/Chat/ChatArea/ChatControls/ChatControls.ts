import './ChatControls.css';
import Block from '../../../../services/Block';
import template from './ChatControls.hbs';
import MessageForm from './MessageForm/MessageForm';
import PopupAttach from './PopupAttach/PopupAttach';
import FormValidator from '../../../../services/FormValidator';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onSendMessage: CallBack,
};

class ChatControls extends Block {
  _onSendMessage: CallBack;

  _validator: FormValidator;

  constructor(props: Props) {
    const { onSendMessage } = props;
    super(props);

    this._onSendMessage = onSendMessage;
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
            input: this.handleInput.bind(this),
            keydown: (evt: Event) => {
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
  componentIsReady() {
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
      this._onSendMessage(formData);

      // Очистка содержимого формы
      if (target.form) {
        target.form.reset();
      } else {
        target.reset();
      }
    }
  }

  handleInput(evt: Event) {
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
