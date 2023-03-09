import './SearchForm.css';
import template from './SearchForm.hbs';
import Block from '../../../../services/Block/Block';
import { EventType } from '../../../../types/types';

type Props = {
  events: EventType[],
};

class SearchForm extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default SearchForm;
