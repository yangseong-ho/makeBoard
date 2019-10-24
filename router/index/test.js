module.exports = function(app) {
    const dateUtils = require('date-utils');
    const mysqlDbc = require('../../mysql/mysqlConnector');
    const utils = require('../../utils/utils');

    app.get('/', function(req, res) {
        var nowDate = new Date();
        var nowDateStr = nowDate.toFormat('YYYYMMDDHH24MISS');
        var prev7DayDate = new Date().add({ days: -7 });
        var prev7DayDateStr = prev7DayDate.toFormat('YYYYMMDDHH24MISS');
        var prev1MonthDate = new Date().add({ months: -1 });
        var prev1MonthDateStr = prev1MonthDate.toFormat('YYYYMMDDHH24MISS');



        res.render('index/index', {
            title: 'Regam',
        });
    });

    app.post('/login', function(req, res) {
        var id = req.body.id;
        var pw = req.body.pw;

        var user = mysqlDbc.query('user', 'selectUserId', {
            id: id
        });
        if (!user || user.length != 1) {
            res.json({
                result: "id"
            });
        }

        user = mysqlDbc.query('user', 'selectUserIdPw', {
            id: id,
            pw: pw
        });
        if (!user || user.length != 1) {
            res.json({
                result: "pw"
            });
        }

        var nowTime = (new Date()).toFormat('YYYYMMDDHH24MISS');
        mysqlDbc.query('user', 'updateUserLogin', {
            id: id,
            pw: pw,
            nowTime: nowTime
        });

        // session save
        req.session.isLogin = true;
        req.session.user = user[0];

        res.json({
            result: 'success'
        });
    });

    app.get('/logout', function(req, res) {

        req.session.isLogin = undefined;
        req.session.user = undefined;

        res.redirect('/');
    });
    app.get('/signup', function(req, res) {
        res.render('index/signup', {
            title: "Regam Sign Up",
            length: 5,
            signErr: 0
        })
    });

    app.post('/signup', function(req, res) {
        var date = utils.getTime();

        if (req.body.name.length == 0 || req.body.pw.length > 20 || req.body.id.length > 30) {
            res.render('index/signup', {
                title: "Regam Sign Up",
                length: 5,
                signErr: 1
            });
            return;
        }

        var user = mysqlDbc.query('user', 'checkid', {
            id: req.body.id
        });
        if (user[0]) {
            res.render('index/signup', {
                title: "Regam Sign Up",
                length: 5,
                signErr: 1
            });
            return;
        }

        var _name = mysqlDbc.query('user', 'selectNickname', {
            name: req.body.name
        });
        if (_name[0]) {
            res.render('index/signup', {
                title: "Regam Sign Up",
                length: 5,
                signErr: 1
            });
            return;
        }

        var values = mysqlDbc.query('user', 'signUp', {
            id: req.body.id,
            pw: req.body.pw,
            name: req.body.name,
            date: date
        });

        var usr = mysqlDbc.query('user', 'selectUserId', {
            id: req.body.id
        });

        mysqlDbc.query('badge', 'insertUserBadge', {
            uid: usr[0].uid,
            badge_seq: 1,
            created_at: date
        });
        if (values.insertId) {
            res.render('index/welcome', {
                title: "Regam welcome",
                length: 5
            });
        } else {
            res.render('index/signup', {
                title: "Regam Sign Up",
                length: 5,
                signErr: 1
            });
        }

    });



    app.post('/checkid', function(req, res) {

        var user = mysqlDbc.query('user', 'selectUserId', {
            id: req.body.id
        });


        if (!user || user.length == 0) {
            res.json({
                data: "YES"
            });
        } else {
            res.json({
                data: "NO"
            });
        }
    });

    app.post('/checkname', function(req, res) {

        var user = mysqlDbc.query('user', 'selectNickname', {
            name: req.body.name
        });


        if (!user || user.length == 0) {
            res.json({
                data: "YES"
            });
        } else {
            res.json({
                data: "NO"
            });
        }
    });
};