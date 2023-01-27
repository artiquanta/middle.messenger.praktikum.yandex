import './Chat.css';
import template from './Chat.hbs';
import Navigation from './Navigation/Navigation';
import ChatArea from './ChatArea/ChatArea';
import ChatStub from './ChatStub/ChatStub';
import Block from '../../services/Block';

type Props = {
  [key: string]: unknown
};

//function Chat(chatData, chats, addUserForm) {
class Chat extends Block {
  constructor(props: Props) {
    super(props);
    if (this.props.chatData.length === 0) {
      this.children.chatArea = new ChatStub({});
    } else {
      this.children.chatArea = new ChatArea({ chatData, addUserForm });
    }
    this.children.navigation = new Navigation(chats);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Chat;