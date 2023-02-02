import './ChatList.css';
import template from './ChatList.hbs';
import ChatCard from './ChatCard/ChatCard';
import Block from '../../../../services/Block';
import FormInput from '../../../Form/FormInput/FormInput';

type Props = {
  [key: string]: unknown
};

class ChatList extends Block {
  constructor(props: Props) {
    const { chats, userId } = props;
    super();
    const body = {};
    body.chatCards = chats.map((chat) => new ChatCard({ chat, userId }));

    this.children.chatCards = body;
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatList;
