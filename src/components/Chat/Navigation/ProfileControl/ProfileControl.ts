import './ProfileControl.css';
import template from './ProfileControl.hbs';
import Block from '../../../../services/Block';

type Props = {
  buttonTitle: string,
  events: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
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
