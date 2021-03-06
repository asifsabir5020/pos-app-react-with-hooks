import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import './index.css';
import App from './containers/App/Loadable';
import {baseURL} from './Common/utiles/axoisConfig';
import reportWebVitals from './reportWebVitals';
import {getUserEmail} from "./containers/Auth/utils";
import {connectLoggedInUserWithSocket} from "./Common/socket";

const history = createBrowserHistory();

if(getUserEmail()){
    connectLoggedInUserWithSocket();
}


ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
