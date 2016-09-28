
$('#videoBlur').width($(window).width());
$('#videoBlur').height($(window).height());

$(document).ready(function() {
	var keyDownState = true; //键盘按下事件 true: 可按下 false:不可按下
	window.globalData = {}; //保存全局数据
	var player = document.getElementById("videoBlur");
	//防止键盘连续按下判断函数
	var keyState = function() {
		keyDownState = true;
	};

	//url解析
	var urlArgs = function() {
		var args = {};
		//去除 ？
		var query = location.search.substring(1);
		var pairs = query.split("&");
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var name = pairs[i].substring(0, pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};

	//初始化
	var init = function() {
		globalData.url = urlArgs();
		if (globalData.url.id == 1) {
			globalData.movieUrl = 'baixiangnameduo';
		}
		else if (globalData.url.id == 2) {
			globalData.movieUrl = 'lvyoudaren';
		}
		else if (globalData.url.id == 3) {
			globalData.movieUrl = 'zhongcaidaren';
		}
		else if (globalData.url.id == 4) {
			globalData.movieUrl = 'pastadaren';
		}
		else if (globalData.url.id == 5) {
			globalData.movieUrl = 'yundongdaren';
		}
		else if (globalData.url.id == 6) {
			globalData.movieUrl = 'xiaobaiduanpian';
		}

		$('#videoBlur').attr('src', 'http://meiriq-static.b0.upaiyun.com/static/TV/movie/'+globalData.movieUrl+'/' + globalData.url.num +'.mp4');

		var playTime = localStorage.getItem('playTime');
		document.getElementById("videoBlur").currentTime = playTime;

		$('body').css({
			background: '#000'
		});
	};

	setInterval(function() {
		var newTime, player = document.getElementById("videoBlur"),
		oldTime = player.currentTime;
		setTimeout(function() {
			newTime = player.currentTime;
			//当前后时间相等时
			if(oldTime == newTime) {
				//非暂停状态
				if(!player.paused) {
					$(".loading-img").css("visibility", "visible");
				}
				else if(player.ended && parseInt(globalData.url.num) < parseInt(globalData.url.len)) {
					localStorage.removeItem("playTime");
					location.href = ["./movie_full.html?id=" + globalData.url.id + "&len=" + globalData.url.len + "&num=" + (parseInt(globalData.url.num) + 1)];
				}
			}
			else {
				$(".loading-img").css("visibility", "hidden");
			}
		},
		200);
	},
	1000);


	//初始化样式
	init();
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		console.log(e.keyCode)
		//左键
		if (e && e.keyCode == 37 && keyDownState) {
			player.currentTime -= 5;
		}
		//右键
		else if (e && e.keyCode == 39 && keyDownState) {
			player.currentTime += 5;
			keyState();
		}
		//确认键
		else if (e && e.keyCode == 13 && keyDownState) {
			if(player.paused) {
				player.play();
			} else {
				player.pause();
			}

			keyState();
		}
		//返回键
		else if (e && e.keyCode == 8 && keyDownState) {
			localStorage.setItem("playTime", (player.currentTime - 2));
			location.href = ['../view/movie_full.html?id='+globalData.url.id+'&len='+ globalData.url.len+'&num='+globalData.url.num];
			keyState();
		}

	};

});