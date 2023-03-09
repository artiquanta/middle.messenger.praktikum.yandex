import './MessageForm.css';
import template from './MessageForm.hbs';
import Block from '../../../../../services/Block/Block';
import { EventType } from '../../../../../types/types';

type Props = {
  events: EventType[],
};

class MessageForm extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default MessageForm;
