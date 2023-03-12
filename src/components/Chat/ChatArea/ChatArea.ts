import './ChatArea.css';
import template from './ChatArea.hbs';
import Block from '../../../services/Block/Block';
import Header from './Header/Header';
import ChatContent from './ChatContent/ChatContent';
import SidePanel from './SidePanel/SidePanel';
import ChatControls from './ChatControls/ChatControls';
import throttle from '../../../utils/helpers/throttle';
import {
  CallBack,
  EventType,
} from '../../../types/types';

type Props = {
  events?: EventType[],
  onSendMessage: CallBack,
  onAddUser: CallBack,
  onDeleteChat: CallBack,
  onRemoveUser: CallBack,
  onGetMessages: CallBack,
};

class ChatArea extends Block {
  private _sidePanelContent: HTMLDivElement;

  private _sidePanelButton: HTMLButtonElement;

  private _chatAttachButton: HTMLButtonElement;

  constructor(props: Props) {
    const {
      onSendMessage,
      onAddUser,
      onRemoveUser,
      onDeleteChat,
      onGetMessages,
    } = props;

    super({
      onDeleteChat,
      onGetMessages,
    });

    const chatAreaBody: Record<string, Block> = {};

    chatAreaBody.header = new Header({});

    chatAreaBody.chatContent = new ChatContent({
      events: [
        {
          selector: 'chat-content__messages',
          events: {
            scroll: throttle<Event>(this._getMessages.bind(this), 750),
          },
        },
      ],
    });

    // Добавление информации о действующих пользователях чата
    chatAreaBody.sidePanel = new SidePanel({
      events: [
        {
          selector: 'side-panel__button',
          events: {
            click: this._openSidePanel.bind(this),
          },
        },
        {
          selector: 'side-panel__delete-chat',
          events: {
            click: this._deleteChat.bind(this),
          },
        },
      ],
      onAddUser,
      onRemoveUser,
      onDeleteChat,
    });

    chatAreaBody.chatControls = new ChatControls({
      events: [
        {
          selector: 'chat-controls__attach-btn',
          events: {
            click: () => {
              this._chatAttachButton.classList.toggle('popup-attach_opened');
            },
          },
        },
      ],
      onSendMessage,
    });

    // Добавление дочерних компонентов
    this.children.chatAreaBody = chatAreaBody;
  }

  // Поиск элементов после монтирования компонента
  _componentIsReady(): void {
    const sidePanelContainer = document.querySelector('.side-panel')!;
    this._sidePanelContent = sidePanelContainer.querySelector('.side-panel__content')!;
    this._sidePanelButton = sidePanelContainer.querySelector('.side-panel__button')!;
    this._chatAttachButton = document.querySelector('.popup-attach')!;
  }

  private _openSidePanel(): void {
    this._sidePanelContent.classList.toggle('side-panel__content_shown');
    this._sidePanelButton.classList.toggle('side-panel__button_action_close');
  }

  // Обработчик удаления текущего чата
  private _deleteChat() {
    this.props.onDeleteChat();
  }

  private async _getMessages(evt: Event) {
    const target = evt.target as HTMLUListElement;
    const top = target.scrollHeight - target.offsetHeight - Math.abs(target.scrollTop);
    if (top < 300) {
      const currentScrollPos = target.scrollTop;
      await this.props.onGetMessages();
      // Временная прокрутка
      setTimeout(() => {
        document.querySelector('.chat-content__messages')?.scrollTo({
          top: currentScrollPos,
        });
      }, 1000);
    }
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatArea;
