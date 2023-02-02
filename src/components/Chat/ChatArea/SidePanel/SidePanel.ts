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
    const { addUserForm, groupUsers, groupOwner } = props;
    const events = [
      {
        selector: 'side-panel__button',
        events: {
          click: (evt) => {
            document.querySelector('.side-panel__content').classList.toggle('side-panel__content_shown');
            evt.target.classList.toggle('side-panel__button_action_close');
          }
        }
      }
    ];
    super({events});
    const sidePanelBody = {};

    sidePanelBody.form = new Form({ form: addUserForm });
    //
    sidePanelBody.usersList = groupUsers.map((user) => new GroupUser({user, groupOwner}));

    this.children.sidePanelBody = sidePanelBody;
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
