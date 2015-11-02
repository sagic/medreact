'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from './../routes'

var container = $('.test')[0];
var history = createBrowserHistory();

ReactDOM.render((
    <Router history={history}>{routes}</Router>
), container);


//import $ from 'jquery'
//import React from 'react'
//import ReactDOM from 'react-dom'
//import App from './components/app'
//
//var section = $('.test')[0];
//console.log(section);
//
//ReactDOM.render(<App />, section);

//import $ from 'jquery'
////import React from 'react'
//import React from 'react/addons';
//import Router from 'react-router'
//import ReactDOM from 'react-dom'
////import Routes from './routes'
//import World from './partials/world'
//
////import CompaniesFilter from './partials/companiesFilter'
//
////Router.run(Routes, Router.HistoryLocation, (Root) => {
////    React.render(<Root {...window.__ReactInitState__}/>, $('.page-content')[0]);
////delete window.__ReactInitState__;
////});
//
//ReactDOM.render(<World />, $('#exhibition')[0]);
////React.render(<World />, $('#exhibition')[0]);
//
////
////import Router from 'react-router';
////import routes from '../routes';
////var main = document.getElementsByTagName('main')[0];
////
////Router.run(routes, Router.HistoryLocation, function ran (Handler, state) {
////    React.render(<Handler />, main);
////});