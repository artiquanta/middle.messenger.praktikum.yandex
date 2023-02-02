import Block from '../../../../services/Block';
import './Header.css';
import template from './Header.hbs';

type Props = {
  [key: string]: unknown
};

class Header extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      group: this.props.group,
      name: this.props.name,
    })
  }
}

export default Header;
