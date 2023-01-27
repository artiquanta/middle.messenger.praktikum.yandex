import Block from '../../../../../services/Block';
import './PopupAttach.css';
import template from './PopupAttach.hbs';

type Props = {
  [key: string]: unknown
};

//function PopupAttach() {
class PopupAttach extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default PopupAttach;
