import './SidePanel.css';
import template from './SidePanel.hbs';

function SidePanel(groupMembers) {
  return template({ groupMembers });
}

export default SidePanel;
