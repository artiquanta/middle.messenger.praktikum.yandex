import './Main.css';
import template from './Main.hbs';
import Navigation from './Navigation/Navigation';
import Chat from './Chat/Chat';

// Тестовый набор данных для наполнения
import { chatData } from '../../utils/constants';

function Main() {
  return template({
    navigation: Navigation(),
    chat: Chat(chatData),
  });
}

export default Main;