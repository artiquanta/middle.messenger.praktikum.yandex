import './Profile.css';
import template from './Profile.hbs';
import Block from '../../services/Block';
import Form from '../Form/Form';
import UploadPopup from '../UploadPopup/UploadPopup';

type Props = {
  [key: string]: unknown
};

class Profile extends Block {
  constructor(props: Props) {
    super(props);
    this.children.personalForm = new Form({props: personalForm});
    this.children.passwordForm = new Form({props: passwordForm});
    this.children.popup = new UploadPopup({});
  }

  render(): DocumentFragment {
    return this.compile(template, {
      user: this.props.userInfo,
    });
  }
}

export default Profile;
