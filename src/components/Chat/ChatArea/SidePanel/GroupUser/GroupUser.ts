import Block from '../../../../../services/Block';
import './GroupUser.css';
import template from './GroupUser.hbs';

type Props = {
  user: {
    name: string,
    avatar: string,
    id: number,
  },
  groupOwner: number,
  events: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class GroupUser extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(
      template,
      {
        user: this.props.user,
        owner: this.props.user.id === this.props.groupOwner,
      },
    );
  }
}

export default GroupUser;
