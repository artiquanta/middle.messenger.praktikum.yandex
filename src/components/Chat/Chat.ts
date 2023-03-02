import './Chat.css';
import template from './Chat.hbs';
import Navigation from './Navigation/Navigation';
import ChatArea from './ChatArea/ChatArea';
import ChatStub from './ChatStub/ChatStub';
import Block from '../../services/Block';
import connect from '../../services/Store/connect';
import isEqual from '../../utils/isEqual';
import {
  State,
  CallBack,
  MessageType,
  ChatType,
  EventType,
} from '../../types/types';

type Props = {
  currentChat: ChatType,
  messages: MessageType[],
  events?: EventType[],
  initializePage: CallBack,
  onSendMessage: CallBack,
  onSearch: CallBack,
  onAddUser: CallBack,
  onRemoveUser: CallBack,
  onSelectChat: CallBack,
  onDeleteChat: CallBack,
  onCreateChat: CallBack,
  onGetMessages: CallBack,
  onMountPage: CallBack,
};

class Chat extends Block {
  private _chatStubContainer: Block;

  private _chatAreaContainer: Block;

  constructor(props: Props) {
    super(props);

    const chatBody: Record<string, Block> = {};

    chatBody.chatHolder = this._setComponent();

    // Добавление блока с навигацией по чатам
    chatBody.navigation = new Navigation({
      onSearch: this.props.onSearch,
      onSelectChat: this.props.onSelectChat,
      onCreateChat: this.props.onCreateChat,
    });

    // Добавление дочерних компонентов основному компоненту
    this.children.chatBody = chatBody;
  }

  private _setComponent(props = this.props): Block {
    const chat = props.currentChat;
    // Отображаем компонент чата, если имеется активный чат
    if (chat && chat.id) {
      // Создаём экземпляр класса, если ранее не создавался
      if (!this._chatAreaContainer) {
        this._chatAreaContainer = new ChatArea({
          onSendMessage: this.props.onSendMessage,
          onAddUser: this.props.onAddUser,
          onRemoveUser: this.props.onRemoveUser,
          onDeleteChat: this.props.onDeleteChat,
          onGetMessages: this.props.onGetMessages,
        });
      }
      return this._chatAreaContainer;
    }

    // Если список чатов пустой, отображаем заглушку
    if (!this._chatStubContainer) {
      this._chatStubContainer = new ChatStub();
    }
    return this._chatStubContainer;
  }

  // Делаем запрос к API после монтирования компонента
  _componentIsReady(): void {
    this.props.initializePage();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    if (oldProps.currentChat !== newProps.currentChat) {
      (this.children.chatBody as Record<string, Block>).chatHolder = this._setComponent(newProps);
    }

    return true;
  }

  componentDidUnmount(): void {
    this.props.unmountPage();
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

function mapStateToProps(state: State) {
  return {
    currentChat: state.safe?.currentChat,
    messages: state.safe?.messages,
  };
}

export default connect(Chat, mapStateToProps);
