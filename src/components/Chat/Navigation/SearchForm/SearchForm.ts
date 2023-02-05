import './SearchForm.css';
import template from './SearchForm.hbs';
import Block from '../../../../services/Block';

type Props = {
  events: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
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
