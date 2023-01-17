import './SidePanel.css';
import template from './SidePanel.hbs';
import GroupUser from './GroupUser/GroupUser';

function SidePanel(groupMembers, groupOwner) {
  const usersList = [];

  groupMembers.forEach((user) => {
    usersList.push(GroupUser(user, groupOwner));
  });

  return template({
    owner: groupOwner,
    usersList,
  });
}

export default SidePanel;
