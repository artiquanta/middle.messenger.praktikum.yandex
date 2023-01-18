import './Header.css';
import template from './Header.hbs';

function Header({ group, name }) {
  return template({ group, name });
}

export default Header;
