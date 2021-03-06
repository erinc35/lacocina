// import React from 'react';
import ReactDOM from 'react-dom';
// import { Router } from "react-router-dom";
import './index.css';
// import history from './history';
// import App from './App';
import { makeMainRoutes } from './routes';
require('dotenv').config();

const routes = makeMainRoutes();

ReactDOM.render(
    routes,
    document.getElementById('root'));
    
// ReactDOM.render(
//     <Router history={history}>
//         <App />
//     </Router>, 
//     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// 