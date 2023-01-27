import Block from '../../../../../../services/Block';
import './LocationMessage.css';
import template from './LocationMessage.hbs';

type Props = {
  [key: string]: unknown
};

//function LocationMessage(content) {
class LocationMessage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { content: this.props.content });
  }
}

export default LocationMessage;
