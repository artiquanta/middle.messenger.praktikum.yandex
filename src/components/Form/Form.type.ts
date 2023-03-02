import { FormType } from '../../types/types';

export type Props = {
  form: FormType,
  events: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  formError?: string,
  handleInput: (evt: Event) => void,
};

export type Input = {
  title: string,
  type: string,
  name: string,
  minLength: number,
  maxLength: number,
  required?: boolean,
};

export type FormElements = {
  id: string,
  heading?: string,
  link?: {
    url: string
    title: string,
  },
  buttonTitle: string,
};
