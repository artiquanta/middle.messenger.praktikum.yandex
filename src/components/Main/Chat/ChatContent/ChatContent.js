import './ChatContent.css';
import template from './ChatContent.hbs';
import Message from './Message/Message';
import UserMessage from './UserMessage/UserMessage';
import ChatDivider from './ChatDivider/ChatDivider';

// Id текущего пользователя для временного наполнения данными
import { userId } from '../../../../utils/constants';

function ChatContent(messages) {

  // Конвертация времени
  function convertTime(time) {
    return new Date(time * 1000).toLocaleTimeString('ru-RU', { timeStyle: 'short' });
  }

  // Конвертация даты
  function convertDay(time) {
    return new Date(time * 1000).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  // Массив с сообщениями для последующего наполнения шаблона
  const messagesList = [];


  // Обработка массива с сообщениями
  messages.forEach((message, index) => {

    // Добавление разделителя сообщений по датам
    if (index === 0) {
      messagesList.push(ChatDivider({ content: 'Начало беседы' }));
    } else {
      const currentMessageDate = convertDay(message.time);
      const previousMessageDate = convertDay(messages[index - 1].time);

      // Если даты не совпадают, добавляем разделить
      if (currentMessageDate !== previousMessageDate) {
        messagesList.push(ChatDivider({ content: currentMessageDate }));
      }
    }

    if (message.owner.id === userId) {
      messagesList.push(UserMessage({
        type: message.type,
        owner: message.owner,
        content: message.content,
        time: convertTime(message.time),
      }));
    } else {
      messagesList.push(Message({
        type: message.type,
        owner: message.owner,
        content: message.content,
        time: convertTime(message.time),
      }));
    }
  });

  return template({ message: messagesList });
}

export default ChatContent;
