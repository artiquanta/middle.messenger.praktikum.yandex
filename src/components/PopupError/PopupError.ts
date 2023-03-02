import './PopupError.css';
import template from './PopupError.hbs';
import Block from '../../services/Block';
import connect from '../../services/Store/connect';
import { EventType, State } from '../../types/types';

type Props = {
  error: {
    code: number,
    reason: string,
  },
  events: EventType[],
};

class PopupError extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      code: this.props.error?.code,
      reason: this.props.error?.reason,
    });
  }
}

function mapStateToProps(state: State) {
  return {
    error: state.safe?.error,
  };
}

export default connect(PopupError, mapStateToProps);
