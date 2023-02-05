import './MessageForm.css';
import template from './MessageForm.hbs';
import Block from '../../../../../services/Block';

type Props = {
  events: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
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
