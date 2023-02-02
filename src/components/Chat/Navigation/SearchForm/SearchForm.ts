import Block from '../../../../services/Block';
import './SearchForm.css';
import template from './SearchForm.hbs';

type Props = {
  [key: string]: unknown
};

//function SearchForm() {
class SearchForm extends Block {
  constructor(props: Props) {
    super();
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default SearchForm;
