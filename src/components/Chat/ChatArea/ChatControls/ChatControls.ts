import Block from '../../../../services/Block';
import './ChatControls.css';
import template from './ChatControls.hbs';
import PopupAttach from './PopupAttach/PopupAttach';

type Props = {
  [key: string]: unknown
};

class ChatControls extends Block {
  constructor(props: Props) {
    const events = [
      {
        selector: 'chat-controls__textarea',
        events: {
          input: (evt) => {
            evt.target.style.height = 'auto';
            evt.target.style.height = evt.target.scrollHeight + 'px';
          }
        }
      },
      {
        selector: 'chat-controls__attach-btn',
        events: {
          click: (evt) => {
            document.querySelector('.popup-attach').classList.toggle('popup-attach_opened');
          }
        }
      },
    ];
    super({ ...props, events });
    this.children.popup = new PopupAttach({});
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatControls;
