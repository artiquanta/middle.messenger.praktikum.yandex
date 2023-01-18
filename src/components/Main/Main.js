import './Main.css';
import template from './Main.hbs';
import Navigation from './Navigation/Navigation';
import Chat from './Chat/Chat';
import ChatStub from './ChatStub/ChatStub';

// Тестовый набор данных для наполнения
import { chatData, chats } from '../../utils/constants';


function Main() {
  const chat = chatData.length === 0 ? ChatStub() : Chat(chatData);
  return template({
    navigation: Navigation(chats),
    chat,
  });
}

export default Main;