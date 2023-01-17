import './Chat.css';
import template from './Chat.hbs';
import Header from './Header/Header';
import ChatContent from './ChatContent/ChatContent';
import SidePanel from './SidePanel/SidePanel';
import ChatControls from './ChatControls/ChatControls';

function Chat(chatData) {
  const {
    group,
    name,
    messages,
    groupOwner,
    groupMembers,
  } = chatData;
  return template({
    header: Header({
      group,
      name,
    }),
    chatContent: ChatContent(messages),
    sidePanel: SidePanel(groupMembers, groupOwner),
    chatControls: ChatControls(),
  });
}

export default Chat;
