import './ChatCard.css';
import template from './ChatCard.hbs';

// Id текущего пользователя для временного наполнения данными
import { userId } from '../../../../../utils/userInfo';
import Block from '../../../../../services/Block';

type Props = {
  [key: string]: unknown
};

//function ChatCard(chatData) {
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
    } = this.props.chatData;

    return this.compile(template, { link, name, owner: lastMessage.user === this.props.userId, time, unreadCount });
  }
}

export default ChatCard;
