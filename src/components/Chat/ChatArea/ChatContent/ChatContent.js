import './ChatContent.css';
import template from './ChatContent.hbs';
import Message from './Message/Message';
import ChatDivider from './ChatDivider/ChatDivider';

function ChatContent(messages) {

  // Конвертация времени
  function convertTime(time) {
    return new Date(time * 1000).toLocaleTimeString('ru-RU', { timeStyle: 'short' });
  }

  // Конвертация даты
  function convertDay(time) {
    return new Date(time * 1000).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  // Проверка, если день в сообщении сегодняшний
  function checkIfToday(time) {
    const today = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    if (convertDay(time) === today) {
      return true;
    } else {
      return false;
    }
  }

  // Массив с сообщениями для последующего наполнения шаблона
  const messagesList = [];


  // Обработка массива с сообщениями
  messages.forEach((message, index) => {
    const messageTime = message.time;
    const time = checkIfToday(messageTime)
      ? `Сегодня в ${convertTime(messageTime)}`
      : `${convertDay(messageTime)} ${convertTime(messageTime)}`;

    // Добавление разделителя сообщений по датам
    if (index === 0) {
      messagesList.push(ChatDivider({ content: 'Начало беседы' }));
    } else {
      const currentMessageDate = convertDay(messageTime);
      const previousMessageDate = convertDay(messages[index - 1].time);

      // Если даты отличаются, добавляем разделить
      if (currentMessageDate !== previousMessageDate) {
        messagesList.push(ChatDivider({ content: currentMessageDate }));
      }
    }

    messagesList.push(Message({
      owner: message.owner,
      content: message.content,
      time,
    }));

  });

  return template({ message: messagesList });
}

export default ChatContent;
