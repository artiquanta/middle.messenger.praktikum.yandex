import './UserCard.css';
import template from './UserCard.hbs';
import Block from '../../../../services/Block';
import * as defaultAvatar from '../../../../images/default-avatar.svg';
import { EventType, UserType } from '../../../../types/types';
import { BASE_RESOURCE_URL } from '../../../../utils/constants';

type Props = {
  user: UserType,
  events?: EventType[],
};

class UserCard extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    /* eslint-disable */
    const {
      id,
      avatar,
      display_name,
      first_name,
      second_name,
      login,
    } = this.props.user;
    /* eslint-enable */

    const userName = display_name ?? `${first_name} ${second_name}`;

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
