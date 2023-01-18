import './GroupUser.css';
import template from './GroupUser.hbs';

function GroupUser(user, groupOwner) {
  return template({
    user,
    owner: user.id === groupOwner,
  });
}

export default GroupUser;
