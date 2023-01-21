import './ChatControls.css';
import template from './ChatControls.hbs';
import PopupAttach from './PopupAttach/PopupAttach';

function ChatControls() {
  return template({ popup: PopupAttach() });
}

export default ChatControls;
