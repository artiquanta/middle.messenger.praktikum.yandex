import './ChatArea.css';
import template from './ChatArea.hbs';
import Header from './Header/Header';
import ChatContent from './ChatContent/ChatContent';
import SidePanel from './SidePanel/SidePanel';
import ChatControls from './ChatControls/ChatControls';

function ChatArea(chatData, addUserForm) {
  const {
    group,
    name,
    messages,
    groupOwner,
    groupUsers,
  } = chatData;

  return template({
    header: Header({
      group,
      name,
    }),
    chatContent: ChatContent(messages),
    sidePanel: SidePanel(groupUsers, groupOwner, addUserForm),
    chatControls: ChatControls(),
  });
}

export default ChatArea;
