import './FormError.css';
import template from './FormError.hbs';
import Block from '../../../services/Block';
import connect from '../../../services/Store/connect';
import { EventType, State } from '../../../types/types';

type Props = {
  formError: string,
  events: EventType[],
};

class FormError extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      error: this.props.formError,
    });
  }
}

function mapStateToProps(state: State) {
  return {
    formError: state.safe?.formError,
  };
}

export default connect(FormError, mapStateToProps);
