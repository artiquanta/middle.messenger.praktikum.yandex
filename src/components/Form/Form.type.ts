export type Form = {
  id: string,
  heading?: string,
  link?: {
    url: string
    title: string,
  },
  buttonTitle: string,
};

export type HTMLInputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime' | 'local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export type Inputs = {
  title: string,
  type: HTMLInputTypeAttribute,
  name: string,
  minLength: number,
  maxLength: number,
  required: boolean,
}[];

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

export type FormType = {
  form: Form,
  inputs: Inputs,
};
