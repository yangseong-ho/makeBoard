module.exports = function (app) {

   const mysqlDbc = require('../../mysql/mysqlConnector');
   // const conn = mysqlDbc.init();
   
   /* MAIN PAGE */ 
   app.get('/', function (req, res) {
      console.log('router/root.js');
      // mysqlDbc.query(conn, "select ? as test", ['root'], function(result){
      //    console.log(result);
      // });
      res.render('index', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/index_logout', function (req, res) {
      res.render('index_logout', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/community_list', function (req, res) {
      res.render('community_list', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/mypage', function (req, res) {
      res.render('mypage', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/badge_purchase', function (req, res) {
      res.render('badge_purchase', {
         title: "블루바이칼",
         length: 5
      })
   });


   /* ROOT PAGE */ 
   app.get('/root_index', function (req, res) {
      res.render('root_index', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/root_independence_board', function (req, res) {
      res.render('root_independence_board', {
         title: "블루바이칼",
         length: 5
      })
   });

   /* Overwatch PAGE */
   app.get('/overwatch_index', function (req, res) {
      res.render('overwatch_index', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/overwatch_transaction', function (req, res) {
      res.render('overwatch_transaction', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/overwatch_board', function (req, res) {
      res.render('overwatch_board', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/overwatch_voting', function (req, res) {
      res.render('overwatch_voting', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/overwatch_voting_history', function (req, res) {
      res.render('overwatch_voting_history', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/overwatch_impeach', function (req, res) {
      res.render('overwatch_impeach', {
         title: "블루바이칼",
         length: 5
      })
   });

   app.get('/overwatch_donate', function (req, res) {
      res.render('overwatch_donate', {
         title: "블루바이칼",
         length: 5
      })
   });
}