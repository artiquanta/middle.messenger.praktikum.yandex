import './Message.css';
import template from './Message.hbs';
import Block from '../../../../../services/Block/Block';
import TextMessage from './TextMessage/TextMessage';
import VideoMessage from './VideoMessage/VideoMessage';
import PhotoMessage from './PhotoMessage/PhotoMessage';
import FileMessage from './FileMessage/FileMessage';
import LocationMessage from './LocationMessage/LocationMessage';
import defaultAvatar from '../../../../../images/default-avatar.svg';
import { BASE_RESOURCE_URL } from '../../../../../utils/constants';
import { EventType, UserType } from '../../../../../types/types';

type Props = {
  owner: UserType,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    fileName: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  },
  time: string,
  user: UserType,
  type: string,
  events?: EventType[],
};

class Message extends Block {
  constructor(props: Props) {
    super(props);

    // Добавляем дочерний компонент сообщений
    this.children.messageContent = this._generateMessage();
  }

  _generateMessage(): Block {
    let message: Block;
    const messageContent: { content: string } = { content: this.props.content };
    switch (this.props.type) {
      case 'message':
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
          content: this.props.file.path,
          fileName: this.props.file.fileName,
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
    const messageOwner = this.props.owner;
    const userName = messageOwner.display_name
      ? messageOwner.display_name
      : `${messageOwner.first_name} ${messageOwner.second_name}`;

    const userAvatar = this.props.owner.avatar
      ? `${BASE_RESOURCE_URL}/${this.props.owner.avatar}`
      : defaultAvatar;

    return this.compile(
      template,
      {
        user: this.props.owner.id === this.props.user.id,
        avatar: userAvatar,
        username: userName,
        time: this.props.time,
      },
    );
  }
}

export default Message;
