import './Form.css';
import template from './Form.hbs';
import FormHeading from './FormHeading/FormHeading';
import FormInput from './FormInput/FormInput';
import FormLink from './FormLink/FormLink';

function Form(formData) {
  const { form, inputs } = formData;
  const heading = form.heading ? FormHeading(form.heading) : false;
  const link = form.link ? FormLink(form.link) : false;

  const inputsList = inputs.map((input) => {
    return FormInput(input);
  });

  return template({
    heading,
    inputsList,
    form,
    link,
  });
}

export default Form;
