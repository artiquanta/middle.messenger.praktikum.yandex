import './ChatArea.css';
import template from './ChatArea.hbs';
import Block from '../../../services/Block';
import Header from './Header/Header';
import ChatContent from './ChatContent/ChatContent';
import SidePanel from './SidePanel/SidePanel';
import ChatControls from './ChatControls/ChatControls';
import { FormType } from '../../../utils/formsContent';
import { ChatDataType } from '../../../utils/chatsContent';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  chatData: ChatDataType,
  addUserForm: FormType,
  userId: number,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onSendMessage: CallBack,
  onAddUser: CallBack,
  onRemoveUser: (data: unknown) => void,
};

class ChatArea extends Block {
  _sidePanelContent: HTMLDivElement;

  _sidePanelButton: HTMLButtonElement;

  _chatAttachButton: HTMLButtonElement;

  constructor(props: Props) {
    const {
      chatData,
      addUserForm,
      userId,
      onSendMessage,
      onAddUser,
      onRemoveUser,
    } = props;
    super(chatData);
    const chatAreaBody: Record<string, Block> = {};

    chatAreaBody.header = new Header({ group: this.props.group, name: this.props.name });
    chatAreaBody.chatContent = new ChatContent({ messages: this.props.messages, userId });

    // Добавляем информацию о пользователях группы, если имеются
    // Иначе добавляется информация о действующих пользователей чата
    chatAreaBody.sidePanel = new SidePanel({
      groupUsers: this.props.groupUsers,
      groupOwner: this.props.groupOwner,
      addUserForm,
      events: [
        {
          selector: 'side-panel__button',
          events: {
            click: this._openSidePanel.bind(this),
          },
        },
      ],
      onAddUser,
      onRemoveUser,
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
  componentIsReady(): void {
    const sidePanelContainer = document.querySelector('.side-panel')!;
    this._sidePanelContent = sidePanelContainer.querySelector('.side-panel__content')!;
    this._sidePanelButton = sidePanelContainer.querySelector('.side-panel__button')!;
    this._chatAttachButton = document.querySelector('.popup-attach')!;
  }

  _openSidePanel(): void {
    this._sidePanelContent.classList.toggle('side-panel__content_shown');
    this._sidePanelButton.classList.toggle('side-panel__button_action_close');
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatArea;
