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
    const newProps = {
      ...props, events: [
        {
          selector: 'chat-card',
          events: {
            click: (evt) => {
              document.querySelectorAll('.chat-card_selected').forEach((element) => element.classList.remove('chat-card_selected'));
              console.log(this._id);
              evt.target.closest('li').classList.toggle('chat-card_selected')
            }
          }
        }
      ]
    }
    super(newProps);
  }

  render(): DocumentFragment {
    const {
      link,
      name,
      lastMessage,
      time,
      unreadCount,
    } = this.props.chat;

    return this.compile(template, { link, name, owner: lastMessage.user === this.props.userId, time, unreadCount, lastMessage });
  }
}

export default ChatCard;
