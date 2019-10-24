require('./mysql/mysqlConnector').init();

const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'regam',
    resave: true,
    saveUninitialized: true
}));

// app.use(function(req, res, next){
//     console.log('devServer interceptor');
//     console.log(req.session);
//     if(!req.session.test){
//         req.session.test = 'test test';
//     }
//     console.log(req.session.test);
//     console.log(req.url);
//
//     next();
// });


const indexServer = require('./server/indexServer');
const rootServer = require('./server/rootServer');

const vhost = require('vhost');
app.use(vhost("localhost", indexServer));
app.use(vhost("root.localhost", rootServer));
app.listen(8080, function(){
    console.log('start dev server 8080 port');
});
