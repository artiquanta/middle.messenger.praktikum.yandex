import Block from '../../services/Block';
import './Form.css';
import template from './Form.hbs';
import FormHeading from './FormHeading/FormHeading';
import FormInput from './FormInput/FormInput';
import FormLink from './FormLink/FormLink';

type Props = {
  [key: string]: unknown
};

type Input = {
  title: string,
  type: string,
  name: string,
  minLength: number,
  maxLength: number,
  required?: boolean,
}

class Form extends Block {
  constructor(props: Props) {
    const { form, events, handleInput } = props;
    super({ form: form.form, events });
    const formBody = {};
    if (form.form.heading) {
      formBody.heading = new FormHeading({ heading: this.props.form.heading });
    }

    if (form.form.link) {
      formBody.link = new FormLink({ link: this.props.form.link });
    }

    formBody.inputsList = form.inputs.map((input: Input) => {
      return new FormInput({
        input, events: [
          {
            selector: 'form-input__input',
            events: {
              focus: handleInput,
              blur: handleInput,
            }
          }
        ]
      });
    });

    /*     this.children = {
          heading: new FormHeading({ heading: form.form.heading}),
          link: new FormLink({ link: form.form.link }),
          inputsList: form.inputs.map((input: Input) => {
            return new FormInput({input});
          }),
        } */
    /*     this.children.formBody = {
          heading: new FormHeading({ heading: this.props.form.heading }),
          inputsList: form.inputs.map((input: Input) => {
            return new FormInput({ input });
          }),
          link: new FormLink({ link: this.props.form.link }),
        } */

    this.children.formBody = formBody;
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps.heading !== newProps.heading) {
      this.children.childs.heading.setProps({ heading: this.props.form.heading });
      return true;
    }
    return true
  }


  render(): DocumentFragment {
    return this.compile(template, {
      buttonTitle: this.props.form.buttonTitle,
      formId: this.props.form.id,
    });
  }
}

export default Form;
