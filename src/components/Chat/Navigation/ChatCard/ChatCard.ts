import './ChatCard.css';
import template from './ChatCard.hbs';
import Block from '../../../../services/Block/Block';
import connect from '../../../../services/Store/connect';
import { convertTime } from '../../../../utils/helpers/convertTime';
import defaultAvatar from '../../../../images/default-avatar.svg';
import {
  ChatType,
  EventType,
  State,
  UserType,
} from '../../../../types/types';
import { BASE_RESOURCE_URL } from '../../../../utils/constants';

type Props = {
  chat: ChatType,
  user: UserType,
  events?: EventType[],
};

type LastMessage = {
  content: string,
  id: number,
  time: string,
  user: {
    avatar: string | null,
    display_name: string | null,
    email: string,
    first_name: string,
    second_name: string,
    login: string,
    phone: string,
  },
};

class ChatCard extends Block {
  constructor(props: Props) {
    super(props);
  }

  // Является ли текущий пользователь владельцем сообщения
  private _returnOwner(message: LastMessage): boolean {
    if (this.props.user) {
      return message
        ? message.user.login === this.props.user.login
        : false;
    }

    return false;
  }

  render(): DocumentFragment {
    const {
      id,
      avatar,
      title,
      last_message: lastMessage,
      unread_count: count,
    } = this.props.chat as ChatType;

    return this.compile(template, {
      avatar: avatar ? `${BASE_RESOURCE_URL}/${avatar}` : defaultAvatar,
      title,
      owner: this._returnOwner(lastMessage),
      time: lastMessage ? convertTime(lastMessage.time) : '',
      unreadCount: count,
      lastMessage,
      isActive: this.props.activeCard === id,
    });
  }
}

function mapStateToProps(state: State) {
  return {
    activeCard: state.safe?.chatId,
  };
}

export default connect(ChatCard, mapStateToProps);
