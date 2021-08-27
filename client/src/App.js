import './style/App.css';
import FormContainer from './components/FormContainer'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  console.log(process.env.NODE_ENV);
  console.log(process.env.PORT)
  return (
    <Router>
      <div className="App">
        < FormContainer />
      </div>
    </Router>
  );
}

export default App;
