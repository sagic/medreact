'use strict';

import React from 'react'
import {Route, DefaultRoute, IndexRoute} from 'react-router'
import App from './client/components/app'
import Home from './client/components/home'
import NoMatch from './client/components/nomatch'
import Test from './client/components/test'

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path="test" component={Test}/>
        <Route path="*" component={NoMatch}/>
    </Route>
);