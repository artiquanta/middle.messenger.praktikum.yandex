import './Navigation.css';
import template from './Navigation.hbs';
import SearchForm from './SearchForm/SearchForm';
import ChatList from './ChatList/ChatList';
import ChatInfo from './ChatInfo/ChatInfo';
import ProfileControl from './ProfileControl/ProfileControl';
import Block from '../../../services/Block';

type Props = {
  [key: string]: unknown
};

//function Navigation(chats) {
class Navigation extends Block {
  constructor(props: Props) {
    const { chats, userId } = props;
    super();
    const navigationBody = {};
    navigationBody.searchForm = new SearchForm({});
    navigationBody.profileControl = new ProfileControl({ buttonTitle: 'Управление профилем', events: [
      {
        selector: 'profile-control__button',
        events: {
          click: () => {
            window.location.href = './profile';
            //console.log(this._id);
          }
        }
      }
    ] });
    // Если чаты отсутствуют - показать заглушку
    if (chats.length === 0) {
      navigationBody.chatsList = new ChatInfo({});
    } else {
      navigationBody.chatsList = new ChatList({ chats, userId });
    }

    this.children.navigationBody = navigationBody;
  }

  render(): DocumentFragment {
    return this.compile(template)
  }
}

export default Navigation;