module.exports = function (app) {

   const mysqlDbc = require('../../mysql/mysqlConnector');
   // const conn = mysqlDbc.init();

   /* MAIN PAGE */ 
   app.get('/2/', function (req, res) {
      console.log('router/index2.js');
      // mysqlDbc.query(conn, "select ? as test", ['index'], function(result){
      //    console.log(result);
      // });
      res.render('index', {
         title: "블루바이칼",
         length: 5
      })
   });
}