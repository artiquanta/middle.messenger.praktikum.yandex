import './ChatList.css';
import template from './ChatList.hbs';
import ChatCard from './ChatCard/ChatCard';
import Block from '../../../../services/Block';

type Props = {
  [key: string]: unknown
};

//function ChatList({ chats }) {
class ChatList extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}


  const chatCards = [];

  // Создание экземпляров карточек чата
  chats.forEach((chat) => {
    chatCards.push(ChatCard(chat));
  });

export default ChatList;
