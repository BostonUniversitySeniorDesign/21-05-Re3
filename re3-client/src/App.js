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
import UserPage from './pages/UserPage';
import ReproducabilityOptions from './pages/ReproducabilityOptionsPage';

import Transition from './pages/Transition';
import BestPractices from './pages/BestPractices';
import CodeReadability from './pages/CodeReadability';

const App = () => {
  const user = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (user ? <Redirect to="homepage" /> : <HomePage />)}
        />
        <Route
          exact
          path="/login"
          render={() => (user ? <Redirect to="homepage" /> : <Login />)}
        />
        <Route exact path="/re3-run" component={RE3Run} />
        <PrivateRoute exact path="/dashboard" component={Rating} />
        <PrivateRoute exact path="/homepage" component={MenuPage} />
        <PrivateRoute exact path="/thanksagain" component={Transition2} />
        <Route
          exact
          path="/ReproducabilityOptions"
          component={ReproducabilityOptions}
        />
        <PrivateRoute exact path="/thanks" component={Transition} />
        <Route exact path="/userpage" component={UserPage} />
        <Route exact path="/bestpractices" component={BestPractices} />
        <Route
          exact
          path="/code-readability-services"
          component={CodeReadability}
        />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
