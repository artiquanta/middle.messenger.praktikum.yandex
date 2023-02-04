import './AppNavigation.css';
import template from './AppNavigation.hbs';
import Block from '../../services/Block';

class AppNavigation extends Block {
  constructor() {
    super();
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default AppNavigation;
