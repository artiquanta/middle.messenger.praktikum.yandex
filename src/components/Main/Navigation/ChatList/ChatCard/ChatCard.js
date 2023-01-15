import './ChatCard.css';
import template from './ChatCard.hbs';

function ChatCard(chatData) {
  const {
    owner,
    link,
    name,
    lastMessage,
    time,
    unreadCount,
  } = chatData;

  return template({
    owner,
    link,
    name,
    lastMessage,
    time,
    unreadCount,
  });
}

export default ChatCard;
