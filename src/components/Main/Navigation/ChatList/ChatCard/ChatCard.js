import './ChatCard.css';
import template from './ChatCard.hbs';

// Id текущего пользователя для временного наполнения данными
import { userId } from '../../../../../utils/constants';

function ChatCard(chatData) {
  const {
    link,
    name,
    lastMessage,
    time,
    unreadCount,
  } = chatData;

  return template({
    owner: lastMessage.user === userId,
    link,
    name,
    lastMessage,
    time,
    unreadCount,
  });
}

export default ChatCard;
