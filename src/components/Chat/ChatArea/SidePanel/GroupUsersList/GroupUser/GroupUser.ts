import Block from '../../../../../../services/Block';
import './GroupUser.css';
import template from './GroupUser.hbs';
import { BASE_RESOURCE_URL } from '../../../../../../utils/constants';
import defaultAvatar from '../../../../../../images/default-avatar.svg';
import { EventType, UserType } from '../../../../../../types/types';

type Props = {
  user: UserType,
  chatUser: UserType,
  chatOwnerId: number,
  events: EventType[],
};

class GroupUser extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    const currentUser = this.props.chatUser;
    // Отображаемое имя пользователя
    const userName = currentUser.display_name
      ? currentUser.display_name
      : `${currentUser.first_name} ${currentUser.second_name}`;
    // Отображаемый аватар (если аватар отсутствует - подставляем стандартный аватар)
    const userAvatar = currentUser.avatar
      ? `${BASE_RESOURCE_URL}/${currentUser.avatar}`
      : defaultAvatar;

    const canManage = this.props.chatOwnerId === this.props.user.id;

    return this.compile(
      template,
      {
        name: userName,
        avatar: userAvatar,
        canManage,
        owner: currentUser.role === 'admin',
      },
    );
  }
}

export default GroupUser;
