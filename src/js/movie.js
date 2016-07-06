$(document).ready(function() {
	var activeColor = '#1abc9c'; //元素焦点颜色
	var initColor = 'rgba(255, 255, 255, 0.3)'; //元素非焦点颜色
	var keyDownState = true; //键盘按下事件 true: 可按下 false:不可按下
	var opacity_hide = "0"; //隐藏
	var opacity_show = "1"; //显示
	var speed_slow = 'slow'; //图片滑动速度慢
	var speed_fast = 'fast'; //图片滑动速度快
	var zIndex_99 = 99; //图层99
	var zIndex_1 = 1; //图层1
	var seclectPos = ['-9.22%', '0', '9.22%', '18.44%', '27.66%', '36.88%', '46.1%', '55.32%', '64.54%', '73.76%', '82.98%', '92.2%']; //剧集位置
	var isPlay = true; //是否播放
	window.globalData = {}; //保存全局数据
	globalData.collectState = true;//初始收藏状态， true:可以收藏， false:已收藏
	//链接数据库
	globalData.collect = localStorage.getItem('data_collect') ? JSON.parse(localStorage.getItem('data_collect')) : [];

	globalData.hot = JSON.parse(localStorage.getItem('data_movies'));

	//防止键盘连续按下判断函数
	var keyState = function() {
			keyDownState = true;
		};

	//获取JSON数据长度
	var getJsonLength =	function(jsonData){

		var jsonLength = 0;
		for(var item in jsonData){
			jsonLength++;
		}
		return jsonLength;
	};

	//url解析
	var urlArgs = function() {
		var args = {};
		var query = location.search.substring(1);
		var pairs = query.split("&");
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var name = pairs[i].substring(0, pos);
			var value = pairs[i].substring(pos+1);
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

		//遍历收藏数据表，判断是否已经收藏
		$.each( globalData.collect, function( i, item ) {
			if(item.title == globalData.hot[globalData.url.id-1].title) {
				globalData.collectState = false;
				globalData.collectId = item.id;
			}
		});

		if(!globalData.collectState) {
			$("#main [data-item=2] span").text('取消追剧');
		}

		//旧播放剧集数
		globalData.seclectNum = globalData.url.num;
		//视频播放焦点
		$("#main [data-item=4]").addClass('active')
			.css({
				borderWidth: '0.25em',
				borderStyle: 'solid',
				borderColor: activeColor
			});

		//输出剧集标号
		for (i = 1; i <= globalData.url.len; i++) {
			msg = "<li class=\"movie-num-item\" data-num='"+i+"'><span>第"+i+"集</span></li>";
			document.querySelector('#main .list-unstyled').innerHTML += msg;
		}

		//剧集编号显示位置
		for (var i = 1; i < 11; i++) {
			$("#main .movie-num [data-num=" + i + "]").css('top', seclectPos[i]);
		}
		$('#main .movie-num [data-num=10]').nextAll().css({
			opacity: opacity_hide,
			top: seclectPos[11]
		});

		//输出视频背景
		$('.mod-detail .bg-img').css({
			height: '100%',
			backgroundImage: "url(" + globalData.hot[globalData.url.id - 1].icon + ")",
			backgroundRepeat: "no-repeat",
			backgroundSize: '100% 100%'
		});

		//设置视频标题
		$("#header .top-title").text(globalData.hot[globalData.url.id - 1].title);

		//剧集选择列表模块数量
		globalData.movieItemLeng = $('.movie-num ul').children('.movie-num-item').length;

		//剧集选择隐藏
		$("#main .movie-num").hide();
	};

	//剧集选择列表
	var seclectList = function(keyCode) {
		//剧集选择顶端剧集编号
		globalData.seclectItemTop = parseInt($("#main .movie-num li[style*='top: 0px']").attr('data-num'));
		//剧集选择底部剧集编号
		globalData.seclectItemBottom = parseInt($("#main .movie-num li[style*='top: 82.98%']").attr('data-num'));

		//剧集上
		if (keyCode == 38) {
			if (globalData.seclectNum == 1) {
				keyState();
			} else if (globalData.seclectNum > 1) {
				if (globalData.seclectNum == globalData.seclectItemTop) {
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 9) + "]").animate({
						top: seclectPos[11],
						opacity: opacity_hide
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 8) + "]").animate({
						top: seclectPos[10]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 7) + "]").animate({
						top: seclectPos[9]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 6) + "]").animate({
						top: seclectPos[8]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 5) + "]").animate({
						top: seclectPos[7]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 4) + "]").animate({
						top: seclectPos[6]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 3) + "]").animate({
						top: seclectPos[5]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 2) + "]").animate({
						top: seclectPos[4]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 1) + "]").animate({
						top: seclectPos[3]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum) + "]").animate({
						top: seclectPos[2]
					}, speed_fast, keyState);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 1) + "]").animate({
						top: seclectPos[1],
						opacity: opacity_show
					}, speed_fast);

					if (globalData.seclectNum == (globalData.movieItemLeng - 9)) {
						$("#main .movie-next").show();
					}
				} else {
					keyState();
				}
			}
		}
		//剧集下
		else if (keyCode == 40) {
			if (globalData.seclectNum == globalData.movieItemLeng) {
				keyState();
			} else if (globalData.seclectNum < globalData.movieItemLeng) {
				if (globalData.seclectNum == globalData.seclectItemBottom) {
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 9) + "]").animate({
						top: seclectPos[0],
						opacity: opacity_hide
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 8) + "]").animate({
						top: seclectPos[1]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 7) + "]").animate({
						top: seclectPos[2]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 6) + "]").animate({
						top: seclectPos[3]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 5) + "]").animate({
						top: seclectPos[4]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 4) + "]").animate({
						top: seclectPos[5]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 3) + "]").animate({
						top: seclectPos[6]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 2) + "]").animate({
						top: seclectPos[7]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum - 1) + "]").animate({
						top: seclectPos[8]
					}, speed_fast);
					$("#main .movie-num [data-num=" + (globalData.seclectNum) + "]").animate({
						top: seclectPos[9]
					}, speed_fast, keyState);
					$("#main .movie-num [data-num=" + (globalData.seclectNum + 1) + "]").animate({
						top: seclectPos[10],
						opacity: opacity_show
					}, speed_fast);

					if (globalData.seclectNum == (globalData.movieItemLeng - 1)) {
						$("#main .movie-next").hide();
					}
				} else {
					keyState();
				}
			}
		}
		//剧集左
		else if (keyCode == 37) {
			$("#main .movie-num li").css('opacity', opacity_show);

			for (var i = 1; i < 11; i++) {
				$("#main .movie-num [data-num=" + i + "]").css('top', seclectPos[i]);
			}
			$('#main .movie-num [data-num=10]').nextAll().css({
				opacity: opacity_hide,
				top: seclectPos[11]
			});
			keyState();
		}
		//选集确认
		else if (keyCode == 13) {

			if (window["androidNative"] && typeof(window["androidNative"].tvUrl) === "function") {
				var tvVideo = "http://meiriq-static.b0.upaiyun.com/static/TV/movie/"+globalData.movieUrl+"/" + globalData.seclectNum + ".mp4";
				window["androidNative"].tvClick(tvVideo);
			}

			//location.href = ['./movie.html?id='+globalData.url.id+'&len='+ globalData.url.len+'&num='+globalData.seclectNum];

			keyState();
		}
	};

	//键盘操作事件
	var keyEvent = function(keyCode) {
			//上
			if (keyCode == 38 && keyDownState) {
				keyDownState = false;
				//当焦点在选集时
				if (globalData.itemNum == 1) {
					keyState();
				}
				//当焦点在追剧/下载本集时
				else if (globalData.itemNum == 2 || globalData.itemNum == 3) {
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
				//当焦点在选集列表时
				else if (isNaN(globalData.itemNum)) {
					if (globalData.seclectNum == 1) {
						keyState();
					} else if (globalData.seclectNum > 1) {
						$("#main [data-item=5] [data-num=" + (globalData.seclectNum - 1) + "]")
							.addClass('active')
							.css({
								backgroundColor: activeColor
							})
							.siblings()
							.removeClass('active')
							.css({
								backgroundColor: initColor
							});

						seclectList(keyCode);
					}
				} else {
					keyState();
				}
			}

			//下
			else if (keyCode == 40 && keyDownState) {
				keyDownState = false;
				//当焦点在选集时
				if (globalData.itemNum == 3) {
					keyState();
				}
				//当焦点在追剧/下载本集时
				else if (globalData.itemNum == 1 || globalData.itemNum == 2) {
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
				}
				//当焦点在选集列表时
				else if (isNaN(globalData.itemNum)) {
					if (globalData.seclectNum == globalData.movieItemLeng) {
						keyState();
					} else if (globalData.seclectNum < globalData.movieItemLeng) {

						$("#main [data-item=5] [data-num=" + (globalData.seclectNum + 1) + "]")
							.addClass('active')
							.css({
								backgroundColor: activeColor
							})
							.siblings()
							.removeClass('active')
							.css({
								backgroundColor: initColor
							});

						seclectList(keyCode);
					}
				} else {
					keyState();
				}
			}

			//左
			else if (keyCode == 37 && keyDownState) {
				keyDownState = false;
				
				//当焦点在选集时
				if (globalData.itemNum == 1 || globalData.itemNum == 2 || globalData.itemNum == 3) {
					keyState();
				}
				//当焦点在选集列表时
				else if (globalData.itemNum == 4 || !isNaN(globalData.itemNum)) {
					$("#main [data-item=1]").addClass('active').css({
						backgroundColor: activeColor
					});
					$("#main [data-item=" + globalData.itemNum + "]")
						.css({
							borderWidth: '0'
						})
						.removeClass('active');

					keyState();
				} else if (isNaN(globalData.itemNum)) {
					seclectList(keyCode);
					$("#main [data-item=1]").addClass('active').css({
						backgroundColor: activeColor
					});
					$("#main [data-item=5] .active").css({
						backgroundColor: initColor
					}).removeClass('active');

					$("#main .movie-num").hide();
				}

			}

			//右
			else if (keyCode == 39 && keyDownState) {
				console.log('globalData.itemNum->'+globalData.itemNum);
				keyDownState = false;
				//当焦点在选集时
				if (globalData.itemNum == 1 || globalData.itemNum == 2) {
					$("#main [data-item=4]").addClass('active')
						.css({
							borderWidth: '0.25em',
							borderStyle: 'solid',
							borderColor: activeColor,
						});
					$("#main [data-item=" + globalData.itemNum + "]")
						.removeClass('active')
						.css({
							backgroundColor: initColor
						});
					keyState();
				}
				//当焦点在选集列表时
				else if (globalData.itemNum == 4 || !isNaN(globalData.itemNum)) {
					keyState();
				} else if (isNaN(globalData.itemNum)) {
					keyState();
				}
			}

			//确认
			else if (keyCode == 13 && keyDownState) {
				keyDownState = false;
				//当焦点在选集时
				if (globalData.itemNum == 1) {
					$("#main .movie-num").show();
					$("#main [data-item=5] [data-num=1]")
						.addClass('active')
						.css({
							backgroundColor: activeColor
						});
					$("#main [data-item=1]")
						.removeClass('active')
						.css({
							backgroundColor: initColor
						});

					if (globalData.movieItemLeng <= 10) {
						$("#main .movie-next").hide();
					} else {
						$("#main .movie-next").show();
					}
					keyState();
				}
				//当焦点在追剧时
				else if (globalData.itemNum == 2) {
					//转化数组
					var collectArray = (localStorage.getItem('collectArray')).split(',');
					//获取所选在collectArray 数组的下标
					var pos = $.inArray(globalData.hot[globalData.url.id-1].title, collectArray);
					if(pos >= 0) {
						//删除该元素
						collectArray.splice(pos, 1);
						globalData.collect.splice(pos, 1);

						localStorage.setItem('collectArray', collectArray);
						localStorage.setItem('data_collect', JSON.stringify(globalData.collect));

						$("#main [data-item=" + globalData.itemNum + "] span").text('追剧');
						globalData.collectState = false;
					}
					//取消追剧
					else {
						//在首位添加
						collectArray.unshift(globalData.hot[globalData.url.id - 1].title);
						globalData.collect.unshift(globalData.hot[globalData.url.id - 1]);

						localStorage.setItem('collectArray', collectArray);
						localStorage.setItem('data_collect', JSON.stringify(globalData.collect));

						$("#main [data-item=" + globalData.itemNum + "] span").text('取消追剧');
						globalData.collectState = true;
					}
					keyState();
				}
				//当焦点在视频时
				else if (globalData.itemNum == 4) {

					if (window["androidNative"] && typeof (window["androidNative"].tvUrl) === "function") {
						var tvVideo = "http://meiriq-static.b0.upaiyun.com/static/TV/movie/" + globalData.movieUrl + "/1.mp4";
						window["androidNative"].tvClick(tvVideo);
					}

					//location.href = ['./movie_full.html?id='+globalData.url.id+'&len='+ globalData.url.len+'&num='+globalData.url.num];
					keyState();
				}
				//当焦点在选集列表时
				else if (isNaN(globalData.itemNum)) {
					seclectList(keyCode);
				}
			}
			// 返回键
			else if (keyCode == 8 && keyDownState) {
				keyDownState = false;

				 if (isNaN(globalData.itemNum)) {
					$("#main [data-item=1]").addClass('active').css({
						backgroundColor: activeColor
					});
					$("#main [data-item=5] .active").css({
						backgroundColor: initColor
					}).removeClass('active');

					$("#main .movie-num").hide();
				} else if (isNaN(globalData.seclectNum) && !isNaN(globalData.itemNum)) {
					localStorage.removeItem("playTime");
					location.href = ("index.html");

				}
				keyState();
			}

	};

	//初始化样式
	init();

	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];

		//焦点所在栏目
		globalData.itemNum = parseInt($('#main .active').attr('data-item'));
		//焦点所在选项
		globalData.seclectNum = parseInt($('#main .movie-num .active').attr('data-num'));

		keyEvent(e.keyCode);
	};
});