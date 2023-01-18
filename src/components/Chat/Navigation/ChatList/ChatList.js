import './ChatList.css';
import template from './ChatList.hbs';
import ChatCard from './ChatCard/ChatCard';

function ChatList({ chats }) {
  const chatCards = [];

  // Создание экземпляров карточек чата
  chats.forEach((chat) => {
    chatCards.push(ChatCard(chat));
  });

  return template({ chatCards });
}

export default ChatList;
