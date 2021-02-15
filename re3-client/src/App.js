import React, { useContext } from 'react';
import './tailwind.output.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Rating from './pages/ReproducabilityInit';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import RE3Run from './pages/RE3Run';
import NotFound from './pages/NotFound';
import Transition2 from './pages/Transition2';
import { AuthContext } from './firebase';
import Transition from './pages/Transition';



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
        <PrivateRoute exact path="/thanksagain" component={Transition2} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
