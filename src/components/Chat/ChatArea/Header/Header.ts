import './Header.css';
import template from './Header.hbs';
import Block from '../../../../services/Block/Block';
import connect from '../../../../services/Store/connect';
import { EventType, State } from '../../../../types/types';

type Props = {
  chatTitle: string,
  events: EventType[],
};

class Header extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      title: this.props.chatTitle,
    });
  }
}

function mapStateToProps(state: State) {
  return {
    chatTitle: state.safe?.currentChat?.title,
  };
}

export default connect(Header, mapStateToProps);
