import './UserCard.css';
import template from './UserCard.hbs';
import Block from '../../../../services/Block/Block';
import defaultAvatar from '../../../../images/default-avatar.svg';
import { BASE_RESOURCE_URL } from '../../../../utils/constants';
import { EventType, UserType } from '../../../../types/types';

type Props = {
  user: UserType,
  events?: EventType[],
};

class UserCard extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    const {
      id,
      avatar,
      display_name: displayName,
      first_name: firstName,
      second_name: secondName,
      login,
    } = this.props.user as UserType;

    const userName = displayName ?? `${firstName} ${secondName}`;

    return this.compile(template, {
      id,
      avatar: avatar ? `${BASE_RESOURCE_URL}/${avatar}` : defaultAvatar,
      userName,
      userLogin: login,
      isActive: this.props.activeCard === id,
    });
  }
}

export default UserCard;
