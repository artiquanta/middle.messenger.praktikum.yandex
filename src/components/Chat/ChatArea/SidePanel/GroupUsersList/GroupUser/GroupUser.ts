import Block from '../../../../../../services/Block/Block';
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

  // Формирование ссылки на аватар
  private _generateAvatarLink(currentUser: UserType): string {
    return currentUser.avatar
      ? `${BASE_RESOURCE_URL}/${currentUser.avatar}`
      : defaultAvatar;
  }

  // Формирование имени пользователя
  private _generateUsername(currentUser: UserType): string {
    return currentUser.display_name
      ? currentUser.display_name
      : `${currentUser.first_name} ${currentUser.second_name}`;
  }

  render(): DocumentFragment {
    const currentUser: UserType = this.props.chatUser;

    // Отображаемое имя пользователя
    const userName = this._generateUsername(currentUser);
    // Отображаемый аватар (если аватар отсутствует - подставляем стандартный аватар)
    const userAvatar = this._generateAvatarLink(currentUser);

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
