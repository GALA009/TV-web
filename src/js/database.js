/***********************************************读取电影数据***********************************************/
/*
*	id: 编号
*	title: 标题
*	icon: 类目图片
*	url: 视频页跳转地址
*	len: 视频总集数
*/
data_movies =
[
	{
		"id": 1,
		"title": "白想那么多",
		"icon": "./dep/img/movies/1.png",
		"url": "movie.html?id=1",
		"len": 19
	}, {
		"id": 2,
		"title": "旅游达人",
		"icon": "./dep/img/movies/2.png",
		"url": "movie.html?id=2",
		"len": 11
	}, {
		"id": 3,
		"title": "种菜达人",
		"icon": "./dep/img/movies/3.png",
		"url": "movie.html?id=3",
		"len": 20
	}, {
		"id": 4,
		"title": "pasta达人",
		"icon": "./dep/img/movies/4.png",
		"url": "movie.html?id=4",
		"len": 12
	}, {
		"id": 5,
		"title": "运动达人",
		"icon": "./dep/img/movies/5.png",
		"url": "movie.html?id=5",
		"len": 16
	}, {
		"id": 6,
		"title": "小白短片",
		"icon": "./dep/img/movies/6.png",
		"url": "movie.html?id=6",
		"len": 12
	}
];
if(localStorage.getItem('data_movies') === null) {
	localStorage.setItem('data_movies', JSON.stringify(data_movies));
}
//console.log(data_movies);

/***********************************************读取游戏数据***********************************************/
/*
*	id: 编号
*	title: 标题
*	icon: 类目图片
*	bg_image: 背景图片
*	url: 游戏页跳转地址
*	game_url: 在线游戏地址
*	download_url: 游戏APK下载地址
*/
data_games =
[{
	"id": 1,
	"title": "不要付账",
	"icon": "./dep/img/games/1.png",
	"bg_image": "./dep/img/games/1_bgimage.png",
	"url": "game.html?id=1",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/BuYaoFuZhang/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/BuYaoFuZhang_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 2,
	"title": "步步高升",
	"icon": "./dep/img/games/2.png",
	"bg_image": "./dep/img/games/2_bgimage.png",
	"url": "game.html?id=2",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/BuBuGaoSheng/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/BuBuGaoSheng_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 3,
	"title": "抢红包",
	"icon": "./dep/img/games/3.png",
	"bg_image": "./dep/img/games/3_bgimage.png",
	"url": "game.html?id=3",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/QiangHongBao/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/QiangHongBao_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 4,
	"title": "痛扁老沙",
	"icon": "./dep/img/games/4.png",
	"bg_image": "./dep/img/games/4_bgimage.png",
	"url": "game.html?id=4",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/TongBianLaoSha/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/TongBianLaoSha_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 5,
	"title": "我要吃肉",
	"icon": "./dep/img/games/5.png",
	"bg_image": "./dep/img/games/5_bgimage.png",
	"url": "game.html?id=5",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/WoYaoChiRou/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/NoMeatNoHappiness_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 6,
	"title": "小白爱消除",
	"icon": "./dep/img/games/6.png",
	"bg_image": "./dep/img/games/6_bgimage.png",
	"url": "game.html?id=6",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/XiaoBaiAiXiaoChu/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/XiaoBaiAiXiaoChu_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 7,
	"title": "新年运势大测验",
	"icon": "./dep/img/games/7.png",
	"bg_image": "./dep/img/games/7_bgimage.png",
	"url": "game.html?id=7",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/XinNianYunShi/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/XinNianYunShi_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 8,
	"title": "血洗办公室",
	"icon": "./dep/img/games/8.png",
	"bg_image": "./dep/img/games/8_bgimage.png",
	"url": "game.html?id=8",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/XueXiBanGongShi/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/XueXiBanGongShi_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 9,
	"title": "雨中狂奔",
	"icon": "./dep/img/games/9.png",
	"bg_image": "./dep/img/games/9_bgimage.png",
	"url": "game.html?id=9",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/YuZhongKuangBen/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/YuZhongKuangBen_v1.0.1_2016-05-19_tvweb.apk"
}];
if(localStorage.getItem('data_games') === null) {
	localStorage.setItem('data_games', JSON.stringify(data_games));
}
//console.log(data_games);

/***********************************************读取最近使用数据***********************************************/
data_lately =
[{
	"id": 3,
	"title": "抢红包",
	"icon": "./dep/img/games/3.png",
	"bg_image": "./dep/img/games/3_bgimage.png",
	"url": "game.html?id=3",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/QiangHongBao/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/QiangHongBao_v1.0.1_2016-05-19_tvweb.apk"
}, {
	"id": 3,
	"title": "种菜达人",
	"icon": "./dep/img/movies/3.png",
	"url": "movie.html?id=3",
	"len": 20
}, {
	"id": 2,
	"title": "旅游达人",
	"icon": "./dep/img/movies/2.png",
	"url": "movie.html?id=2",
	"len": 11
}, {
	"id": 4,
	"title": "痛扁老沙",
	"icon": "./dep/img/games/4.png",
	"bg_image": "./dep/img/games/4_bgimage.png",
	"url": "game.html?id=4",
	"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/TongBianLaoSha/index.html",
	"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/TongBianLaoSha_v1.0.1_2016-05-19_tvweb.apk"
}];
if(localStorage.getItem('data_lately') === null) {
	localStorage.setItem('data_lately', JSON.stringify(data_lately));
}
//console.log(data_lately);

/***********************************************读取我的收藏数据***********************************************/
// data_collect =
// [{
// 		"id": 3,
// 		"title": "种菜达人",
// 		"icon": "./dep/img/movies/3.png",
// 		"url": "movie.html?id=3",
// 		"len": 20
// 	},
// 	{
// 		"id": 4,
// 		"title": "痛扁老沙",
// 		"icon": "./dep/img/games/4.png",
// 		"bg_image": "./dep/img/games/4_bgimage.png",
// 		"url": "game.html?id=4",
// 		"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/TongBianLaoSha/index.html",
// 		"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/TongBianLaoSha_v1.0.1_2016-05-19_tvweb.apk"
// 	},
// 	{
// 		"id": 3,
// 		"title": "抢红包",
// 		"icon": "./dep/img/games/3.png",
// 		"bg_image": "./dep/img/games/3_bgimage.png",
// 		"url": "game.html?id=3",
// 		"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/QiangHongBao/index.html",
// 		"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/QiangHongBao_v1.0.1_2016-05-19_tvweb.apk"
// 	},
// 	{
// 		"id": 1,
// 		"title": "白想那么多",
// 		"icon": "./dep/img/movies/1.png",
// 		"url": "movie.html?id=1",
// 		"len": 19
// 	},
// 	{
// 		"id": 8,
// 		"title": "血洗办公室",
// 		"icon": "./dep/img/games/8.png",
// 		"bg_image": "./dep/img/games/8_bgimage.png",
// 		"url": "game.html?id=8",
// 		"game_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Web/XueXiBanGongShi/index.html",
// 		"download_url": "http://meiriq-static.b0.upaiyun.com/static/TV/TVonlinebox/TvWeb_Online/Game/Apk/XueXiBanGongShi_v1.0.1_2016-05-19_tvweb.apk"
// 	}
// ];
// if(localStorage.getItem('data_collect') === null) {
// 	localStorage.setItem('data_collect', JSON.stringify(data_collect));
// }
//console.log(data_collect);

/***********************************************读取我的下载数据***********************************************/
// data_download =
// [{
// 		"packName": "com.meiriq.gamepadtv.basketball",
// 		"lable": "力挽狂篮"
// 	},
// 	{
// 		"packName": "com.meiriq.game.androidtv.buyaofuzhang",
// 		"lable": "不要付账"
// 	},
// 	{
// 		"packName": "com.meiriq.game.androidtv.tongbianlaosha",
// 		"lable": "痛扁老沙"
// 	},
// 	{
// 		"packName": "com.meiriq.game.androidtv.genbentingbuxialai",
// 		"lable": "根本停不下来"
// 	},
// 	{
// 		"packName": "com.meiriq.game.androidtv.bubugaosheng",
// 		"lable": "步步高升"
// 	},
// 	{
// 		"packName": "com.meiriq.game.androidtv.greedsnake",
// 		"lable": "GreedSnake"
// 	},
// 	{
// 		"packName": "com.meiriq.game.androidtv.dungeon",
// 		"lable": "命运地牢"
// 	},
// 	{
// 		"packName": "com.meiriq.game.androidtv.tongbianlaosha",
// 		"lable": "痛扁老沙"
// 	}

// ];
// if(localStorage.getItem('getJson') === null) {
// 	localStorage.setItem('getJson', JSON.stringify(data_download));
// }
//console.log(data_download);


