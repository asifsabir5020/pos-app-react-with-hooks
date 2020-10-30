import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import './index.css';
import App from './App';
import {baseURL} from './Common/utiles/axoisConfig';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
