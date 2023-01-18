import './Navigation.css';
import template from './Navigation.hbs';
import SearchForm from './SearchForm/SearchForm';
import ChatList from './ChatList/ChatList';
import ChatInfo from './ChatInfo/ChatInfo';
import ProfileControl from './ProfileControl/ProfileControl';

function Navigation(chats) {
  // Если чаты отсутствуют - показать заглушку
  const chatsList = chats.length === 0 ? ChatInfo() : ChatList({ chats });

  return template({
    searchForm: SearchForm(),
    chatsList,
    profileControl: ProfileControl({ buttonTitle: 'Управление профилем' }),
  });
}

export default Navigation;