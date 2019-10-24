module.exports = function (app) {

    const mysqlDbc = require('../../mysql/mysqlConnector');
    // const conn = mysqlDbc.init();

    var prev7DayDate = new Date().add({days: -7});
    var prev7DayDateStr = prev7DayDate.toFormat('YYYYMMDDHH24MISS');
    var prev1MonthDate = new Date().add({months: -1});
    var prev1MonthDateStr = prev1MonthDate.toFormat('YYYYMMDDHH24MISS');

    app.get('/posts/new', function (req, res) {

        var posts = mysqlDbc.query('board', 'selectIndexBoardNew', {
            createdAt: prev7DayDateStr,
            startIndex: 0,
            limitCnt: 10,
        })

        res.render('index/posts/index', {
            title: 'NewPost - Regam',
            posts:posts,
        })
    })

    app.post('/posts/new', function (req, res) {
        var num = req.body.num
        var page_board_cnt = 10

        var posts = mysqlDbc.query('board', 'selectIndexBoardNew', {
            createdAt: prev7DayDateStr,
            startIndex: page_board_cnt * (num-1),
            limitCnt: page_board_cnt,
        })

        res.json({
            result: posts
        });
        
    })

    app.get('/posts/best', function (req, res) {
        
        var posts = mysqlDbc.query('board', 'selectIndexBoardBest', {
            createdAt: prev7DayDateStr,
            startIndex: 0,
            limitCnt: 10,
        });

        res.render('index/posts/index', {
            title: 'BestPost - Regam',
            posts:posts,
        })
    })

    app.post('/posts/best', function (req, res) {
        var num = req.body.num
        var page_board_cnt = 10

        var posts = mysqlDbc.query('board', 'selectIndexBoardBest', {
            createdAt: prev7DayDateStr,
            startIndex: page_board_cnt * (num-1),
            limitCnt: page_board_cnt,
        })

        res.json({
            result: posts
        });
    })

    // show
    app.get("/posts/:seq", function(req, res){
        var seq = parseInt(req.params.seq)
        var posts = mysqlDbc.query('board', 'selectContentWhereId', {
            seq: seq
        });
        // var comments = mysqlDbc.query('board', 'selectComment', {
        //     seq: seq,
        //     board_seq: seq
        // });
        res.render("index/posts/show", {
            title: 'Post - Regam',
            post:posts[0],
            // comment:comments,
        })
    });

 }