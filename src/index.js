import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import socketIOClient from 'socket.io-client';
import './index.css';
import App from './App';
import {baseURL} from './Common/utiles/axoisConfig';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

const socket = socketIOClient('http://localhost:8080');
socket.on("reload", data => {
    if(data === 'reload'){
        console.log('reload', data);
        // localStorage.clear();
        // window.location.reload();
    }
});

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
