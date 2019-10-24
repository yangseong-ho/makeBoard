const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const sessionParser = require('express-session');
const fs = require("fs")
const mysqlDbc = require('../mysql/mysqlConnector');


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
// app.use(sessionParser({
//     secret: 'regam',
//     resave: true,
//     saveUninitialized: true
// }));

app.use(function(req, res, next) {
    var session = req.session;
    if (!session.isLogin) {
        session.isLogin = false;
        session.user = undefined;
    }

    res.locals.isLogin = session.isLogin;
    res.locals.user = session.user;


    // right side data
    // var prev1MonthDate = new Date().add({ months: -1 });
    // var prev1MonthDateStr = prev1MonthDate.toFormat('YYYYMMDDHH24MISS');
    // var prev7DayDate = new Date().add({ days: -7 });
    // var prev7DayDateStr = prev7DayDate.toFormat('YYYYMMDDHH24MISS');
    // var noticeNewList = mysqlDbc.query('notice', 'selectNoticeNew', {
    //     createdAt: prev7DayDateStr,
    //     limitCnt: 6
    // });
    // var communityNewList = mysqlDbc.query('community', 'selectCommunityNew', {
    //     createdAt: prev1MonthDateStr,
    //     limitCnt: 4
    // });
    // res.locals.noticeNewList = noticeNewList;
    // res.locals.communityNewList = communityNewList;

    next();
});

const router1 = require('../router/index/test')(app)
    // const router1 = require('../router/index/index')(app);
    // const router2 = require('../router/index/index2')(app);
    // const router3 = require('../router/index/posts')(app);
    // const router4 = require('../router/index/mypage')(app);

module.exports = app;