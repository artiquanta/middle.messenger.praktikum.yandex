import Form from '../Form/Form';
import './Profile.css';
import template from './Profile.hbs';

function Profile({ personalForm, passwordForm, userInfo }) {
  return template({
    user: userInfo,
    personalForm: Form(personalForm),
    passwordForm: Form(passwordForm),
  });
}

export default Profile;
