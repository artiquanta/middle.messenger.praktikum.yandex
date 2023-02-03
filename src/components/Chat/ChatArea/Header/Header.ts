import './Header.css';
import template from './Header.hbs';
import Block from '../../../../services/Block';

type Props = {
  group: boolean,
  name: string,
};

class Header extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      group: this.props.group,
      name: this.props.name,
    });
  }
}

export default Header;
