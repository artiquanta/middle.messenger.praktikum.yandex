import './PopupAttach.css';
import template from './PopupAttach.hbs';
import Block from '../../../../../services/Block';
import { EventType } from '../../../../../types/types';

type Props = {
  events?: EventType[],
};

class PopupAttach extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default PopupAttach;
