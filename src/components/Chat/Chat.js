import './Chat.css';
import template from './Chat.hbs';
import Navigation from './Navigation/Navigation';
import ChatArea from './ChatArea/ChatArea';
import ChatStub from './ChatStub/ChatStub';

function Chat(chatData, chats, addUserForm) {
  const chatArea = chatData.length === 0 ? ChatStub() : ChatArea(chatData, addUserForm);
  return template({
    navigation: Navigation(chats),
    chatArea,
  });
}

export default Chat;