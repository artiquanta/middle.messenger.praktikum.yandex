import './SearchResults.css';
import template from './SearchResults.hbs';
import Block from '../../../../services/Block';
import connect from '../../../../services/Store/connect';
import ChatCard from '../ChatCard/ChatCard';
import UserCard from '../UserCard/UserCard';
import isEqual from '../../../../utils/isEqual';
import {
  CallBack,
  ChatType,
  EventType,
  State,
  UserType,
} from '../../../../types/types';

type Props = {
  foundChats: ChatType[],
  foundUsers: UserType[],
  chatId: number,
  events?: EventType[],
  onSelectChat: CallBack,
  onCreateChat: CallBack,
};

class SearchResults extends Block {
  private _lastChatCardId: number;

  private _userCardActiveId: number;

  constructor(props: Props) {
    const {
      foundUsers = [], foundChats = [], onSelectChat, onCreateChat,
    } = props;
    super({
      foundUsers, foundChats, onSelectChat, onCreateChat,
    });

    if (foundUsers.length > 0) {
      this.children.foundUsersList = this._renderUserSearch();
    }

    if (foundChats.length > 0) {
      this.children.foundChatsList = this._renderChatSearch();
    }
  }

  private _renderUserSearch(props = this.props) {
    return props.foundUsers.map((user: UserType) => new UserCard({
      user,
      events: [
        {
          selector: 'user-card',
          events: {
            click: () => this._handleUserCardClick(user.id),
          },
        },
      ],
    }));
  }

  private _renderChatSearch(props = this.props) {
    return props.foundChats.map((chat: ChatType) => new ChatCard({
      chat,
      events: [
        {
          selector: 'chat-card',
          events: {
            click: () => this._handleChatCardClick(chat.id),
          },
        },
      ],
    }));
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    // Добавление первоначального значения для lastChatCardId, если имеется открытый чат
    if (oldProps.chatId !== newProps.chatId) {
      this._lastChatCardId = newProps.chatId;
    }

    // Отображение результатов поиска (список пользователей и найденные чаты)
    if (newProps.foundChats && oldProps.foundUsers !== newProps.foundUsers) {
      this.children.foundUsersList = this._renderUserSearch(newProps);
    }

    if (newProps.foundChats && oldProps.foundChats !== newProps.foundChats) {
      this.children.foundChatsList = this._renderChatSearch(newProps);
    }

    return true;
  }

  private _handleChatCardClick(chatId: number): void {
    if (chatId !== this._lastChatCardId) {
      this._lastChatCardId = chatId;
      this.props.onSelectChat(chatId);
    }
  }

  private _handleUserCardClick(userId: number): void {
    if (userId !== this._userCardActiveId) {
      this._userCardActiveId = userId;
      this.props.onCreateChat(userId);
    }
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

function mapStateToProps(state: State) {
  return {
    foundUsers: state.safe?.foundUsers,
    foundChats: state.safe?.foundChats,
    chatId: state.safe?.chatId,
  };
}

export default connect(SearchResults, mapStateToProps);
