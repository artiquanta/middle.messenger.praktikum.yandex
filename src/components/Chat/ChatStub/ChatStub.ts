import './ChatStub.css';
import template from './ChatStub.hbs';
import Block from '../../../services/Block';
import { EventType } from '../../../types/types';

type Props = {
  events?: EventType[],
};

class ChatStub extends Block {
  constructor(props?: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatStub;
