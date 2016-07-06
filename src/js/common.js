/**
 * @authors Zhang Genmao (zhanggenmao@meiriq.com)
 * @date    2016-4-7 20:47:22
 * @version 1.0
 * @主页 Javascript
 */
window.globalData = {}; //保存全局数据

// //读取电影数据
// $.getJSON("../scripts/data_movies.js", function(result) {
// 	globalData.data_movies = result;
// 	localStorage.setItem('data_movies', JSON.stringify(result));
// 	console.log(globalData.data_movies);
// });

// //读取游戏数据
// $.getJSON("../scripts/data_games.js", function(result) {
// 	globalData.data_games = result;
// 	localStorage.setItem('data_games', JSON.stringify(result));
// 	console.log(globalData.data_games);
// });

// //读取我的下载数据
// // $.getJSON("../scripts/data_test.js", function(result) {
// // 	localStorage.setItem('getJson', JSON.stringify(result));
// // 	globalData.data_test = result;
// // 	//console.log(globalData.data_test);
// // });


// //读取最近使用数据
// $.getJSON("../scripts/data_lately.js", function(result) {
// 	localStorage.setItem('data_lately', JSON.stringify(result));
// 	globalData.data_test = result;
// 	console.log(globalData.data_test);
// });

//顶部时间函数
function startTime() {
    var today = new Date(), 
	time_hour = today.getHours(), 
	time_minute = checkTime(today.getMinutes());
    $("#header .top-time span").text(time_hour + ":" + time_minute);
    setTimeout(startTime, 1000);
}
//格式化时间
function checkTime(i) {
	i = (i<10)? "0"+i : i;
	return i;
}

//获取JSON数据长度
var getJsonLength = function(jsonData) {

	var jsonLength = 0;
	for (var item in jsonData) {
		jsonLength++;
	}
	return jsonLength;
};

$(document).ready(function() {
	var x;
	//判断是否是第一次进入,输出收藏所以项目标题
	if(localStorage.getItem('collectArray') === null) {
		var _collect = [];
		var dataCollect = JSON.parse(localStorage.getItem('data_collect'));

		for (x in dataCollect) {
			_collect[x] = dataCollect[x].title;
		}
		localStorage.setItem('collectArray', _collect);
	}

	//判断是否是第一次进入,输出最近栏所以项目标题
	if(localStorage.getItem('latelyArray') === null) {
		var _lately = [];
		var datalately = JSON.parse(localStorage.getItem('data_lately'));

		for (x in datalately) {
			_lately[x] = datalately[x].title;
		}
		localStorage.setItem('latelyArray', _lately);
	}

	startTime();
});
