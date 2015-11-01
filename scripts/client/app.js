
import $ from 'jquery'
import React from 'react'
import Router from 'react-router'
//import Routes from './routes'
import World from './partials/world'

//import CompaniesFilter from './partials/companiesFilter'

//Router.run(Routes, Router.HistoryLocation, (Root) => {
//    React.render(<Root {...window.__ReactInitState__}/>, $('.page-content')[0]);
//delete window.__ReactInitState__;
//});


React.render(<World />, $('#exhibition')[0]);
