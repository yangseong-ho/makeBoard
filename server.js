require('./mysql/mysqlConnector').init();

const express = require('express');
const app = express();

const indexServer = require('./server/indexServer');
const rootServer = require('./server/rootServer');

const vhost = require('vhost');
app.use(vhost("regam.net", indexServer));
app.use(vhost("root.regam.net", rootServer));
app.listen(8080, function(){
    console.log('start server 8080 port');
});
