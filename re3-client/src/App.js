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
import NotFound from './pages/NotFound';
import { AuthContext } from './firebase';

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
        <PrivateRoute exact path="/dashboard" component={Rating} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
