const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require("fs")


// app.set('views', __dirname + '/views');
app.set('views', 'views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// const server = app.listen(3000, function(){
//     console.log("Express server has started on port 3000")
// });

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(session({
//     secret: 'regam',
//     resave: true,
//     saveUninitialized: true
// }));

app.use(function(req, res, next){

    next();
});

const router = require('../router/root/root')(app);

module.exports = app;