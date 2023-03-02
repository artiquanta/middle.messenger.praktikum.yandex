import './ChatList.css';
import template from './ChatList.hbs';
import Block from '../../../../services/Block';
import ChatCard from '../ChatCard/ChatCard';
import connect from '../../../../services/Store/connect';
import isEqual from '../../../../utils/isEqual';
import {
  CallBack,
  ChatType,
  EventType,
  State,
  UserType,
} from '../../../../types/types';

type Props = {
  chats: ChatType[],
  user: UserType,
  chatId: number,
  events?: EventType[],
  onSelectChat: CallBack;
};

class ChatList extends Block {
  private _selectedCardId: number;

  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    // Устанавливаем первоначальное значение _selectedCardId, если имеется открытый чат
    if (oldProps.chatId !== newProps.chatId) {
      this._selectedCardId = newProps.chatId;
    }

    if (newProps.chats && newProps.chats !== oldProps.chats) {
      this.children.chatCards = newProps.chats.map((chat) => new ChatCard({
        chat,
        user: this.props.user,
        events: [
          {
            selector: 'chat-card',
            events: {
              click: () => this._handleCardClick(chat.id),
            },
          },
        ],
      }));

      return true;
    }

    return false;
  }

  // Обработчик клика по карточке
  private _handleCardClick(chatId: number): void {
    if (this._selectedCardId !== chatId) {
      this._selectedCardId = chatId;
      this.props.onSelectChat(chatId);
    }
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

function mapStateToProps(state: State) {
  return {
    chats: state.safe?.chats,
    user: state.user,
    chatId: state.safe?.chatId,
  };
}

export default connect(ChatList, mapStateToProps);
