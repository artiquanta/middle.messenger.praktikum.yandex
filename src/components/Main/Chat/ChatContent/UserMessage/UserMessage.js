import './UserMessage.css';
import template from './UserMessage.hbs';
import TextMessage from '../Message/TextMessage/TextMessage';
import VideoMessage from '../Message/VideoMessage/VideoMessage';
import PhotoMessage from '../Message/PhotoMessage/PhotoMessage';
import FileMessage from '../Message/FileMessage/FileMessage';
import LocationMessage from '../Message/LocationMessage/LocationMessage';

function UserMessage(messageData) {
  const {
    content,
    time,
  } = messageData;

  const messageContent = content.value;

  let message;

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
        user: true,
      });
      break;
    case 'location':
      message = LocationMessage(messageContent);
      break;
    default:
      return console.error('Ошибка при создании карточки сообщения. Некорректный тип данных');
  }

  const messageTemplate = template({
    message,
    time,
  });

  return messageTemplate;
}

export default UserMessage;
