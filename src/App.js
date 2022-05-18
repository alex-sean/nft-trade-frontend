import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import './App.css';
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
        </Switch>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
