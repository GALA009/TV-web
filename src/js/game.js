$(document).ready(function() {
	var activeColor = '#1abc9c'; //元素焦点颜色
	var initColor = 'rgba(255, 255, 255, 0.3)'; //元素非焦点颜色
	var keyDownState = true; //键盘按下事件 true: 可按下 false:不可按下
	var zIndex_99 = 99; //图层99
	var zIndex_1 = 1; //图层1
	window.globalData = {}; //保存全局数据
	globalData.collectState = true; //初始收藏状态， true:可以收藏， false:已收藏
	globalData.gameState = true; //初始最近栏状态， true:可以添加， false:不可添加
	//链接数据库

	globalData.collect = localStorage.getItem('data_collect') ? JSON.parse(localStorage.getItem('data_collect')) : [];

	globalData.game = JSON.parse(localStorage.getItem('data_games'));
	globalData.lately = JSON.parse(localStorage.getItem('data_lately'));
	//防止键盘连续按下判断函数
	var keyState = function() {
		keyDownState = true;
	};

	//获取JSON数据长度
	var getJsonLength = function(jsonData) {

		var jsonLength = 0;
		for (var item in jsonData) {
			jsonLength++;
		}
		return jsonLength;
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

		//遍历收藏数据表，判断是否已经收藏
		$.each(globalData.collect, function(i, item) {
			if (item.title == globalData.game[globalData.url.id - 1].title) {
				globalData.collectState = false;
				globalData.collectId = item.id;
			}
		});

		//判断是否已经收藏，已收藏则修改文字
		if (!globalData.collectState) {
			$('#main .nav-btn-collect-game span').text('取消收藏');
		}

		//设置游戏名称
		$('#header .top-title').text(globalData.game[globalData.url.id - 1].title);
		//设置游戏背景图
		$("#main .mod-game").css({
			backgroundImage: "url(" + globalData.game[globalData.url.id - 1].bg_image + ")"
		});

		$("#main [data-item=3]").addClass('active')
			.css({
				borderWidth: '0.25em',
				borderStyle: 'solid',
				borderColor: activeColor
			});

		$('#main .nav-btn-download-game span').text('下载游戏');

		$("#main .full-play").show();
	};

	//初始化样式
	init();
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];

		//焦点所在栏目
		globalData.itemNum = parseInt($('#main .active').attr('data-item'));

		//上键
		if (e && e.keyCode == 38 && keyDownState) {
			if (globalData.itemNum == 1) {
				keyState();
			} else if (globalData.itemNum == 2) {
				$("#main [data-item=" + (globalData.itemNum - 1) + "]")
					.addClass('active')
					.css({
						backgroundColor: activeColor
					})
					.siblings()
					.removeClass('active')
					.css({
						backgroundColor: initColor
					});

				keyState();
			}
		}
		//下键
		else if (e && e.keyCode == 40 && keyDownState) {
			if (globalData.itemNum == 1) {
				$("#main [data-item=" + (globalData.itemNum + 1) + "]")
					.addClass('active')
					.css({
						backgroundColor: activeColor
					})
					.siblings()
					.removeClass('active')
					.css({
						backgroundColor: initColor
					});
				keyState();
			} else if (globalData.itemNum == 2) {
				keyState();
			}
		}
		//左键
		else if (e && e.keyCode == 37 && keyDownState) {
			$("#main [data-item=1]")
				.addClass('active')
				.css({
					backgroundColor: activeColor
				});

			$("#main [data-item=3]")
				.removeClass('active')
				.css({
					borderWidth: '0'
				});
			$('#main .mod-game iframe').blur();

			keyState();

		}
		//右键
		else if (e && e.keyCode == 39 && keyDownState) {
			$("#main [data-item=" + globalData.itemNum + "]")
				.removeClass('active')
				.css({
					backgroundColor: initColor
				});

			$("#main [data-item=3]")
				.addClass('active')
				.css({
					borderWidth: '0.25em',
					borderStyle: 'solid',
					borderColor: activeColor
				});

			keyState();

		}
		//确认键
		else if (e && e.keyCode == 13 && keyDownState) {
			if (globalData.itemNum == 1) {
				if(localStorage.getItem('collectArray') == '') {
					globalData.collectArray = [];
				}
				else {
					//转化数组
					globalData.collectArray = (localStorage.getItem('collectArray')).split(',');
				}
				//获取所选在collectArray 数组的下标
				var pos = $.inArray(globalData.game[globalData.url.id-1].title, globalData.collectArray);

				if(pos >= 0) {
					//删除该元素
					globalData.collectArray.splice(pos, 1);
					globalData.collect.splice(pos, 1);

					localStorage.setItem('collectArray', globalData.collectArray);
					localStorage.setItem('data_collect', JSON.stringify(globalData.collect));

					$('#main .nav-btn-collect-game span').text('收藏');
					globalData.collectState = false;
				}
				//取消追剧
				else {
					//在首位添加
					globalData.collectArray.unshift(globalData.game[globalData.url.id - 1].title);
					globalData.collect.unshift(globalData.game[globalData.url.id - 1]);

					localStorage.setItem('collectArray', globalData.collectArray);
					localStorage.setItem('data_collect', JSON.stringify(globalData.collect));

					$('#main .nav-btn-collect-game span').text('取消收藏');
					globalData.collectState = true;
				}
			} else if (globalData.itemNum == 2) {
				if (window["androidNative"] && typeof(window["androidNative"].tvUrl) === "function") {
					window["androidNative"].downLoad(globalData.game[globalData.url.id - 1].download_url, globalData.game[globalData.url.id - 1].title);
				}

			} else if (globalData.itemNum == 3) {
				$("#main [data-item=3]")
					.addClass('active')
					.css({
						borderWidth: '0.25em',
						borderStyle: 'solid',
						borderColor: initColor
					});
				$("#main .full-play").hide();

				if (window["androidNative"] && typeof(window["androidNative"].tvUrl) === "function") {
					window["androidNative"].openGame(globalData.game[globalData.url.id - 1].game_url);
				}

				//location.href = [globalData.game[globalData.url.id - 1].game_url];
			}

			keyState();
		}
		//返回键
		else if (e && e.keyCode == 8 && keyDownState) {
			location.href = ('index.html');
			keyState();
		}
	};

});