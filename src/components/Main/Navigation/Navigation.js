import './Navigation.css';
import template from './Navigation.hbs';
import SearchForm from './SearchForm/SearchForm';
import ChatList from './ChatList/ChatList';
import ProfileControl from './ProfileControl/ProfileControl';

// Тестовый список чатов
import { chats } from '../../../utils/constants.js';

function Navigation() {
  return template({
    searchForm: SearchForm(),
    chatList: ChatList({ chats }),
    profileControl: ProfileControl({ linkTitle: 'Управление профилем' }),
  });
}

export default Navigation;