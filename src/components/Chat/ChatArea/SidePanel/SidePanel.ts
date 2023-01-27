import './SidePanel.css';
import template from './SidePanel.hbs';
import GroupUser from './GroupUser/GroupUser';
import Form from '../../../Form/Form';
import Block from '../../../../services/Block';

type Props = {
  [key: string]: unknown
};

//function SidePanel(groupUsers, groupOwner, addUserForm) {
class SidePanel extends Block {
  constructor(props: Props) {
    super(props);
    this.children.form = new Form({ adduserForm });
    //
    this.children.usersList;
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}
/*   const usersList = [];

  groupUsers.forEach((user) => {
    usersList.push(GroupUser(user, groupOwner));
  }); */


export default SidePanel;
