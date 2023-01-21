import './SidePanel.css';
import template from './SidePanel.hbs';
import GroupUser from './GroupUser/GroupUser';
import Form from '../../../Form/Form';

function SidePanel(groupUsers, groupOwner, addUserForm) {
  const usersList = [];

  groupUsers.forEach((user) => {
    usersList.push(GroupUser(user, groupOwner));
  });

  return template({
    usersList,
    form: Form(addUserForm),
  });
}

export default SidePanel;
