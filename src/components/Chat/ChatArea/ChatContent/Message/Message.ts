import './Message.css';
import template from './Message.hbs';
import Block from '../../../../../services/Block';
import TextMessage from './TextMessage/TextMessage';
import VideoMessage from './VideoMessage/VideoMessage';
import PhotoMessage from './PhotoMessage/PhotoMessage';
import FileMessage from './FileMessage/FileMessage';
import LocationMessage from './LocationMessage/LocationMessage';

type MessageTypes = 'text' | 'file' | 'location' | 'photo' | 'video';

type Props = {
  owner: {
    id: number,
    avatar: string,
    username: string,
  },
  content: {
    type: keyof MessageTypes,
    fileName?: string,
    value: string,
  },
  time: string,
  userId: number,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class Message extends Block {
  constructor(props: Props) {
    super(props);

    // Добавляем дочерний компонент
    this.children.messageContent = this._generateMessage();
  }

  _generateMessage(): Block {
    let message: Block;
    const messageContent: { content: string } = { content: this.props.content.value };
    switch (this.props.content.type) {
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
          content: this.props.content.value,
          fileName: this.props.content.fileName,
        });
        break;
      case 'location':
        message = new LocationMessage(messageContent);
        break;
      default:
        message = new TextMessage(messageContent);
        break;
    }

    // Вовзращаем доченрний компонент
    return message;
  }

  render(): DocumentFragment {
    return this.compile(
      template,
      {
        user: this.props.owner.id === this.props.userId,
        avatar: this.props.owner.avatar,
        username: this.props.owner.username,
        time: this.props.time,
      },
    );
  }
}

export default Message;
