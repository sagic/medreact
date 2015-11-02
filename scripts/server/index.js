import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import routes from './../routes';
import App from '../client/components/app';
//import router from './router';

var app = express();

var rootFolder = __dirname + './../../build/client';
app.use(express.static(rootFolder, {maxAge: '1d'}));

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.locals.settings['x-powered-by'] = false;

//app.use(router);
//
//app.get('/', function home (req, res) {
//    res.render('pages/index', {
//        state: 'var __INIT_STATE_ = ' + JSON.stringify({test:123}) + ' ;',
//        reactHtml: ReactDOMServer.renderToString(<App />)
//    });
//});

app.get('*', function (req, res) {
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            res.status(200).send(renderToString(<RoutingContext {...renderProps} />))
        } else {
            res.status(404).send('Not found')
        }
    })
});

app.listen(process.env.PORT || 3000);
console.log('server listening on port ' + (process.env.PORT || 3000));

