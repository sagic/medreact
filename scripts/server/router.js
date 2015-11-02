'use strict';

import React from 'react';
import Router from 'react-router';
import routes from './../routes';

export default function router (req, res, next) {
    var context = {
        routes: routes, location: req.url
    };





    Router.create(context).run(function (Handler, state) {
        var data = req.model || {};
        res.render('pages/index', {
            state: 'var __INIT_STATE_ = ' + JSON.stringify({test:123}) + ' ;',
            reactHtml: ReactDOMServer.renderToString(<Handler data={data} />)
        });
    });


};