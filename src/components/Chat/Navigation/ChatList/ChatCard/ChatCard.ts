import './ChatCard.css';
import template from './ChatCard.hbs';
import Block from '../../../../../services/Block';

type ChatType = {
  owner: boolean,
  link: string,
  name: string,
  lastMessage: {
    content: string,
    user: number,
  },
  time: string,
  unreadCount: number,
};

type Props = {
  chat: ChatType,
  userId: number,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class ChatCard extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    const {
      link,
      name,
      lastMessage,
      time,
      unreadCount,
    } = this.props.chat;

    return this.compile(template, {
      link,
      name,
      owner: lastMessage.user === this.props.userId,
      time,
      unreadCount,
      lastMessage,
    });
  }
}

export default ChatCard;
