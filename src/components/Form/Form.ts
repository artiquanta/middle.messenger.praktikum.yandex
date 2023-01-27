import Block from '../../services/Block';
import './Form.css';
import template from './Form.hbs';
import FormHeading from './FormHeading/FormHeading';
import FormInput from './FormInput/FormInput';
import FormLink from './FormLink/FormLink';

type Props = {
  [key: string]: unknown
};

class Form extends Block {
  constructor(props: Props) {
    super(props);
/*     if (this.props.heading) {
      this.children.formHeading = new FormHeading({});
    }
    if (this.props.link) {
      this.children.formLink = new FormLink({});
    } */
  }

  /*   const inputsList = inputs.map((input) => {
      return FormInput(input);
    }); */

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Form;
