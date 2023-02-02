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
    const {chatData, addUserForm, chats, userId} = props;
    super();
    const chatBody = {};

    if (chatData.length === 0) {
      chatBody.chatArea = new ChatStub({});
    } else {
      chatBody.chatArea = new ChatArea({ chatData, addUserForm, userId });
    }

   chatBody.navigation = new Navigation({chats, userId});
   this.children.chatBody = chatBody;
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Chat;