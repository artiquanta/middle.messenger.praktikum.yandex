import './Loader.css';
import template from './Loader.hbs';
import Block from '../../services/Block';
import connect from '../../services/Store/connect';
import { EventType, State } from '../../types/types';

type Props = {
  isProcessing: boolean,
  events: EventType[],
};

class Loader extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      isProcessing: this.props.isProcessing,
    });
  }
}

function mapStateToProps(state: State) {
  return {
    isProcessing: state.safe?.isProcessing,
  };
}

export default connect(Loader, mapStateToProps);
