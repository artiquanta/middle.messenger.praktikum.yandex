import Block from '../../../../services/Block';
import './ProfileControl.css';
import template from './ProfileControl.hbs';

type Props = {
  [key: string]: unknown
};

//function ProfileControl({ buttonTitle }) {
class ProfileControl extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { buttonTitle: this.props.buttonTitle });
  }
}

export default ProfileControl;
