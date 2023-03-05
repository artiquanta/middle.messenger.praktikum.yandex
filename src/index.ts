import './index.css';
import App from './components/App/App';

const root: HTMLElement = document.getElementById('root')!;
const app: App = new App();
root.appendChild(app.getContent());
