import './Chat.css';
import template from './Chat.hbs';
import Navigation from './Navigation/Navigation';
import ChatArea from './ChatArea/ChatArea';
import ChatStub from './ChatStub/ChatStub';
import Block from '../../services/Block';
import { FormType } from '../../utils/formsContent';
import { ChatsType, ChatDataType } from '../../utils/chatsContent';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  addUserForm: FormType,
  chats: ChatsType,
  chatData: ChatDataType,
  userId: number,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onSendMessage: CallBack,
  onSearch: CallBack,
  onAddUser: CallBack,
  onRemoveUser: (data: unknown) => void,
};

class Chat extends Block {
  constructor(props: Props) {
    const {
      chatData,
      addUserForm,
      chats,
      userId,
      onSendMessage,
      onSearch,
      onAddUser,
      onRemoveUser,
    } = props;
    super();

    const chatBody: Record<string, Block> = {};

    // Если объект с информацией о имеющихся чатах пустой, отобразить страницу-заглушку
    if (Object.keys(chatData).length === 0) {
      chatBody.chatArea = new ChatStub({});
    } else { // иначе отобразить окно чата
      chatBody.chatArea = new ChatArea({
        chatData,
        addUserForm,
        userId,
        onSendMessage,
        onAddUser,
        onRemoveUser,
      });
    }

    // Добавление блока с навигацией по чатам
    chatBody.navigation = new Navigation({ chats, userId, onSearch });

    // Добавление дочерних компонентов основному компоненту
    this.children.chatBody = chatBody;
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Chat;
