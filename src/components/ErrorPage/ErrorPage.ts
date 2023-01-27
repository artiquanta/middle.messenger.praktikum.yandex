import './ErrorPage.css';
import template from './ErrorPage.hbs';
import Block from '../../services/Block';

type Props = {
  [key: string]: unknown,
  //events?: Record<keyof HTMLElementEventMap, Function>[];
  //events?: Record<string, string | Record<keyof HTMLElementEventMap, (arg?: Event) => void>>[],
  events?: Record<string, string | Record<keyof HTMLElementEventMap, (arg?: Event) => void>>[],
};

class ErrorPage extends Block {
  constructor(props: Props) {
    super(props);
  };

  render() {
    return this.compile(template, {
      title: this.props.title,
      description: this.props.description,
      link: this.props.link,
      linkTitle: this.props.linkTitle,
    });
  }
}

export default ErrorPage;
