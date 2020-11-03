import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import './index.css';
import App from './App';
import {baseURL} from './Common/utiles/axoisConfig';
import reportWebVitals from './reportWebVitals';
import socketIOClient from "socket.io-client";
import {getUserEmail} from "./containers/Auth/utils";

const history = createBrowserHistory();

const socket = socketIOClient('http://192.168.0.104:8080', { query: `userEmail=${getUserEmail()}` });

socket.on("user-status-toggle", response => {
    console.log('user-status-toggle',response);
    localStorage.clear();
    window.location.reload();
});

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
