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

class ChatCard extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    const {
      /* eslint-disable */
      id,
      avatar,
      title,
      last_message,
      unread_count,
    } = this.props.chat;
    /* eslint-enable */

    let isOwner;
    if (this.props.user) {
      isOwner = last_message ? last_message.user.login === this.props.user.login : false;
    } else {
      isOwner = false;
    }

    return this.compile(template, {
      avatar: avatar ? `${BASE_RESOURCE_URL}/${avatar}` : defaultAvatar,
      title,
      owner: isOwner,
      time: last_message ? convertTime(last_message.time) : '',
      unreadCount: unread_count,
      lastMessage: last_message,
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
