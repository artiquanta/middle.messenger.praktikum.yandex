import './UploadPopup.css';
import template from './UploadPopup.hbs';

function UploadPopup(popupData) {
  const { title, hint, button } = popupData;
  return template({ title, hint, button });
}

export default UploadPopup;
