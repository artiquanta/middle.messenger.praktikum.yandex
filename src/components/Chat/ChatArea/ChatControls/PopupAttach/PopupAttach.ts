import './PopupAttach.css';
import template from './PopupAttach.hbs';
import Block from '../../../../../services/Block';

type Props = {
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
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
