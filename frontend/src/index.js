import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './utils/browserHistory';
import { setAxiosConfig, setAuthorizationToken } from './utils/axiosHelpers';

if (localStorage.token) {
  setAuthorizationToken();
} else {
  history.push('/login');
}

setAxiosConfig();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
