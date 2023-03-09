import './ProfileControl.css';
import template from './ProfileControl.hbs';
import Block from '../../../../services/Block/Block';
import { EventType } from '../../../../types/types';

type Props = {
  buttonTitle: string,
  events: EventType[],
};

class ProfileControl extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { buttonTitle: this.props.buttonTitle });
  }
}

export default ProfileControl;
