import './Message.css';
import template from './Message.hbs';
import TextMessage from './TextMessage/TextMessage';
import VideoMessage from './VideoMessage/VideoMessage';
import PhotoMessage from './PhotoMessage/PhotoMessage';
import FileMessage from './FileMessage/FileMessage';
import LocationMessage from './LocationMessage/LocationMessage';

// Id текущего пользователя для временного наполнения данными
import Block from '../../../../../services/Block';

type Props = {
  [key: string]: unknown
};

class Message extends Block {
  constructor(props: Props) {
    const { content, owner, time, userId } = props;
    const events = [
      {
        selector: 'message_type_user',
        events: {
          click: (evt) => {
            evt.preventDefault();
            evt.target.closest('.message__container').classList.toggle('message__container_selected');
          }
        }
      }
    ]
    super({ owner, time, userId, events });
    let message: Block;
    const messageContent = { content: content.value };
    switch (content.type) {
      case 'text':
        message = new TextMessage(messageContent);
        break;
      case 'video':
        message = new VideoMessage(messageContent);
        break;
      case 'image':
        message = new PhotoMessage(messageContent);
        break;
      case 'file':
        message = new FileMessage({
          value: messageContent,
          fileName: content.fileName,
        });
        break;
      case 'location':
        message = new LocationMessage(messageContent);
        break;
      default:
        message = new TextMessage(messageContent);
        break;
    }
    this.children.messageContent = message;
  }

  render(): DocumentFragment {
    return this.compile(template,
      {
        user: this.props.owner.id === this.props.userId,
        avatar: this.props.owner.avatar,
        username: this.props.owner.username,
        time: this.props.time
      });
  }
}

export default Message;
