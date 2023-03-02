import './Avatar.css';
import template from './Avatar.hbs';
import Block from '../../../services/Block';
import connect from '../../../services/Store/connect';
import { EventType, State } from '../../../types/types';

type Props = {
  avatar: string,
  events?: EventType[],
};

class Avatar extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      avatar: this.props.avatar,
    });
  }
}

function mapStateToProps(state: State) {
  return {
    avatar: state.user?.avatar,
  };
}

export default connect(Avatar, mapStateToProps);
