const date = require('date-utils');

var getTime = function(){
    return new Date().toFormat('YYYYMMDDHH24MISS');
 }

var prev7DayDate = new Date().add({days: -7});
var prev7DayDateStr = prev7DayDate.toFormat('YYYYMMDDHH24MISS');
var prev1MonthDate = new Date().add({months: -1});
var prev1MonthDateStr = prev1MonthDate.toFormat('YYYYMMDDHH24MISS');