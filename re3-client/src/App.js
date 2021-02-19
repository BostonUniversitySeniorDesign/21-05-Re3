import React, { useContext } from 'react';
import './tailwind.output.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Rating from './pages/Rating';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import RE3Run from './pages/RE3Run2';
import NotFound from './pages/NotFound';
import Transition2 from './pages/Transition2';
import { AuthContext } from './firebase';
import Transition from './pages/Transition';
import ReproducabilityOptions from './pages/ReproducabilityOptionsPage';



const App = () => {
  const user = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (user ? <Redirect to="dashboard" /> : <HomePage />)}
        />
        <Route
          exact
          path="/login"
          render={() => (user ? <Redirect to="dashboard" /> : <Login />)}
        />
        <Route exact path="/re3-run" component={RE3Run} />
        <PrivateRoute exact path="/dashboard" component={Rating} />
        <PrivateRoute exact path="/thanks" component={Transition} />
        <PrivateRoute exact path="/homepage" component={MenuPage} />
        <PrivateRoute exact path="/thanksagain" component={Transition2} />
        <Route exact path="/ReproducabilityOptions" component={ReproducabilityOptions}/>
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
