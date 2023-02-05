import './ChatList.css';
import template from './ChatList.hbs';
import Block from '../../../../services/Block';
import ChatCard from './ChatCard/ChatCard';
import { ChatsType } from '../../../../utils/chatsContent';

type Props = {
  chats: ChatsType,
  userId: number,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class ChatList extends Block {
  _cardsContainer: HTMLUListElement;

  constructor(props: Props) {
    const { chats, userId } = props;
    super();

    const chatListBody: Record<string, Block | Block[]> = {};

    // Генерация карточек чатов
    chatListBody.chatCards = chats.map((chat) => new ChatCard({
      chat,
      userId,
      events: [
        {
          selector: 'chat-card',
          events: {
            click: this._handleCardClick.bind(this),
          },
        },
      ],
    }));

    // Добавление дочерних компонентов
    this.children.chatCards = chatListBody;
  }

  componentIsReady(): void {
    this._cardsContainer = document.querySelector('.chat-list')!;
  }

  // Обработчик клика по карточке
  _handleCardClick(evt: Event): void {
    const selectedCards: NodeListOf<HTMLLIElement> = this._cardsContainer.querySelectorAll('.chat-card_selected')!;
    selectedCards.forEach((element: HTMLLIElement) => element.classList.remove('chat-card_selected'));
    const target = evt.target as HTMLDivElement;
    target.closest('li')!.classList.add('chat-card_selected');
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatList;
