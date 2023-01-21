import './ErrorPage.css';
import template from './ErrorPage.hbs';

function ErrorPage(error) {
  const { title, description, link, linkTitle } = error;

  return template({
    title,
    description,
    link,
    linkTitle,
  });
}

export default ErrorPage;
