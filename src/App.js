import './style/App.css';
import FormContainer from './components/FormContainer'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        < FormContainer />
      </div>
    </Router>
  );
}

export default App;
