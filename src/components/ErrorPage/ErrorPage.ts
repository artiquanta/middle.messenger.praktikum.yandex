import './ErrorPage.css';
import template from './ErrorPage.hbs';
import Block from '../../services/Block';

type Props = {
  title: string,
  description: string,
  link: string,
  linkTitle: string,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class ErrorPage extends Block {
  constructor(props: Props) {
    super(props);
  }

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
