import './GroupUsersList.css';
import template from './GroupUsersList.hbs';
import Block from '../../../../../services/Block/Block';
import connect from '../../../../../services/Store/connect';
import GroupUser from './GroupUser/GroupUser';
import isEqual from '../../../../../utils/helpers/isEqual';
import { CallBack, State, UserType } from '../../../../../types/types';

type Props = {
  user: UserType,
  chatUsers: UserType[],
  chatOwnerId: number,
  onRemoveUser: CallBack,
};

class GroupUsersList extends Block {
  constructor(props: Props) {
    const {
      chatUsers = [],
      chatOwnerId = 0,
      onRemoveUser,
      user,
    } = props;

    super({
      chatUsers,
      chatOwnerId,
      user,
      onRemoveUser,
    });

    this.children.usersList = this._renderGroupUsers(this.props.chatUsers);
  }

  private _renderGroupUsers(usersList: UserType[]) {
    return usersList.map((groupUser) => new GroupUser({
      user: this.props.user,
      chatUser: groupUser,
      chatOwnerId: this.props.chatOwnerId,
      events: [
        {
          selector: 'group-user__remove-user',
          events: {
            click: () => this._handleRemoveUser(groupUser.id),
          },
        },
      ],
    }));
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    if (newProps.chatUsers && oldProps.chatUsers !== newProps.chatUsers) {
      this.children.usersList = this._renderGroupUsers(newProps.chatUsers);
      return true;
    }

    return true;
  }

  // Обработчик удаления пользователя
  private _handleRemoveUser(userId: number) {
    this.props.onRemoveUser(userId);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

function mapStateToProps(state: State) {
  return {
    user: state.user,
    chatUsers: state.safe?.chatUsers,
    chatOwnerId: state.safe?.chatOwnerId,
  };
}

export default connect(GroupUsersList, mapStateToProps);
