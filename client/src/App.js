import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import getPets from './components/readPets.component'
import Login_ from './views/Login';
import Login from './components/SI'
import singUp from './components/SU'

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/main' component={getPets}/>
      <Route path='/singup' component={singUp}/>
      <Route path='/' component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;

