import React, { useState, useContext } from 'react';
import './tailwind.output.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Onboarding from './pages/Onboarding';
// import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Loading from './pages/Loading';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import { AuthContext } from './firebase';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const user = useContext(AuthContext);

  setTimeout(() => {
    setInitializing(false);
  }, 3000);

  if (initializing && user == null) {
    return <Loading />;
  }

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
        <PrivateRoute exact path="/dashboard" component={Onboarding} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
