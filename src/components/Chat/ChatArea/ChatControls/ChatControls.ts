import Block from '../../../../services/Block';
import './ChatControls.css';
import template from './ChatControls.hbs';
import PopupAttach from './PopupAttach/PopupAttach';

type Props = {
  [key: string]: unknown
};

class ChatControls extends Block {
  constructor(props: Props) {
    super(props);
    this.children.popup = new PopupAttach({});
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatControls;
