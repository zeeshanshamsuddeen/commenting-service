import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Comments from './components/comments';
import browserHistory from './utils/browserHistory';
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Fragment>
          <Switch>
            <Route exact path="/comments" component={Comments} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
