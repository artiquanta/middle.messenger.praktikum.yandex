import './Navigation.css';
import template from './Navigation.hbs';
import SearchForm from './SearchForm/SearchForm';
import ChatList from './ChatList/ChatList';
import ChatInfo from './ChatInfo/ChatInfo';
import ProfileControl from './ProfileControl/ProfileControl';
import Block from '../../../services/Block';
import { render } from 'express/lib/response';

type Props = {
  [key: string]: unknown
};

//function Navigation(chats) {
class Navigation extends Block {
  constructor(props: Props) {
    super(props);
    this.children.searchForm = new SearchForm({});
    this.children.profileControl = new ProfileControl({ buttonTitle: 'Управление профилем' });
    // Если чаты отсутствуют - показать заглушку
    if (this.props.chats.length === 0) {
      this.children.chatList = new ChatInfo({});
    } else {
      this.children.chatList = new ChatList({ chats: this.props.chats });
    }
  }

  render(): DocumentFragment {
    return this.compile(template)
  }
}

export default Navigation;