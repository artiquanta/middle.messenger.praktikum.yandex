import './ChatArea.css';
import template from './ChatArea.hbs';
import Header from './Header/Header';
import ChatContent from './ChatContent/ChatContent';
import SidePanel from './SidePanel/SidePanel';
import ChatControls from './ChatControls/ChatControls';
import Block from '../../../services/Block';

type Props = {
  [key: string]: unknown
};

//function ChatArea(chatData, addUserForm) {
class ChatArea extends Block {
  constructor(props: Props) {
    super(props);
    this.children.header = new Header({ group, name });
    this.children.chatContent = new ChatContent({ messages });
    this.children.sidePanel = new SidePanel({ groupUsers, groupOwner, addUserForm });
    this.children.chatControls = new ChatControls({});
  }

  /*   const {
      group,
      name,
      messages,
      groupOwner,
      groupUsers,
    } = chatData; */

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatArea;
