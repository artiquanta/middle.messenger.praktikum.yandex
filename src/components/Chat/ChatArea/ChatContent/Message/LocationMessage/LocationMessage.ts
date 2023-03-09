import './LocationMessage.css';
import template from './LocationMessage.hbs';
import Block from '../../../../../../services/Block/Block';

type Props = {
  content: string,
};

class LocationMessage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { content: this.props.content });
  }
}

export default LocationMessage;
