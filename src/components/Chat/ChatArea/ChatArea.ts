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
    const { chatData, addUserForm, userId } = props;
    super(chatData);
    const chatAreaBody = {};

    chatAreaBody.header = new Header({ group: this.props.group, name: this.props.name });
    chatAreaBody.chatContent = new ChatContent({ messages: this.props.messages, userId });
    chatAreaBody.sidePanel = new SidePanel({ groupUsers: this.props.groupUsers, groupOwner: this.props.groupOwner, addUserForm });
    chatAreaBody.chatControls = new ChatControls({});

    this.children.chatAreaBody = chatAreaBody;
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
