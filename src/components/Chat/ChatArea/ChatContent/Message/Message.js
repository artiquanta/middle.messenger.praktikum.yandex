import './Message.css';
import template from './Message.hbs';
import TextMessage from './TextMessage/TextMessage';
import VideoMessage from './VideoMessage/VideoMessage';
import PhotoMessage from './PhotoMessage/PhotoMessage';
import FileMessage from './FileMessage/FileMessage';
import LocationMessage from './LocationMessage/LocationMessage';

// Id текущего пользователя для временного наполнения данными
import { userId } from '../../../../../utils/userInfo';

function Message(messageData) {
  const {
    owner,
    content,
    time,
  } = messageData;

  const messageContent = content.value;

  let message;

  // Генерируем сообщение в зависимости от его типа содержимого
  switch (content.type) {
    case 'text':
      message = TextMessage(messageContent);
      break;
    case 'video':
      message = VideoMessage(messageContent);
      break;
    case 'image':
      message = PhotoMessage(messageContent);
      break;
    case 'file':
      message = FileMessage({
        value: messageContent,
        fileName: content.fileName,
      });
      break;
    case 'location':
      message = LocationMessage(messageContent);
      break;
    default:
      return console.error('Ошибка при создании карточки сообщения. Некорректный тип данных');
  }

  return template({
    user: owner.id === userId,
    avatar: owner.avatar,
    username: owner.username,
    message,
    time,
  });
}

export default Message;
