import './App.css';
import template from './App.hbs';
import Main from '../Main/Main';

function App() {
  
  const page = Main();

  return template({
    page,
  });
}

export default App;
