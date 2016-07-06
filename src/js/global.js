//保存全局数据
window.globalData = {};
//获取JSON文件
//安卓交互
function getJson (data) {
	globalData.getJson = data;
	localStorage.setItem('getJson', globalData.getJson);
	globalData.getJsonTest = JSON.parse(localStorage.getItem('getJson'));
}

$(document).ready(function() {
	var speed_slow = 'slow'; //图片滑动速度慢
	var speed_fast = 'fast'; //图片滑动速度快
	var opacity_hide = "0"; //隐藏
	var opacity_show = "1"; //显示
	var keyDownState = true; //键盘按下事件 true: 可按下 false:不可按下
	var zIndex_99 = 99; //图层99
	var zIndex_1 = 1; //图层1
	var hotImgPosition = ['0', '9.9%', '50%', '90.1%', '130.2%']; //视频栏选项位置数组
	var otherImgPosition = ['0', '9.9%', '35.94%', '61.97%', '88.02%', '103.6%']; //游戏/最近栏选项位置数组
	var activeBoxShadow = '.25em .25em .63em rgba(0, 0, 0, 0.8)'; //焦点阴影
	var activeBorder = '.1em solid #1abc9c';


	//防止键盘连续按下判断函数
	var keyState = function() {
			keyDownState = true;
		};
	//初始化
	var init = function() {

		//获取数据
		globalData.hot = JSON.parse(localStorage.getItem('data_movies'));
		globalData.game = JSON.parse(localStorage.getItem('data_games'));
		globalData.lately = JSON.parse(localStorage.getItem('data_lately'));

		//合并所有数据
		var data_movies = localStorage.getItem('data_movies');
		var data_games = localStorage.getItem('data_games');
		globalData.allData = JSON.parse((data_movies.concat(data_games)).replace(/\]\[/g, ','));
		localStorage.setItem('allData', JSON.stringify(globalData.allData));

		//输出HTML最近栏
		outHtml();

		//初始化样式参数
		$(".mod-movie-item div").first().css('left', hotImgPosition[1]);
		$(".mod-game-item div").first().css('left', otherImgPosition[1]);
		$(".mod-lately-item div").first().css('left', otherImgPosition[1]);

		$('#main .mod-hot [data-num=3]').nextAll().css({
			left: hotImgPosition[4]
		});
		$('#main .mod-other [data-num=4]').nextAll().css({
			left: otherImgPosition[5]
		});

	};

	//输出最近栏HTML代码
	var outHtml = function() {

		//输出视频HTML
		for (i = 0; i < getJsonLength(globalData.hot); i++) {
			msg = "<div class='pull-left big-box' data-num=" + (i+1) + "><img src=" + globalData.hot[i].icon + " alt=''></div>";
			document.querySelector('#main .mod-movie-item').innerHTML += msg;
		}
		$('#main .mod-movie-item [data-num=1]').css({
			left: '9.9%'
		}).addClass('active');

		//输出游戏栏HTML
		for (i = 0; i < getJsonLength(globalData.game); i++) {
			msg = "<div class='pull-left samll-box' data-num=" + (i+1) + "><img src=" + globalData.game[i].icon + " alt=''></div>";
			document.querySelector('#main .mod-game-item').innerHTML += msg;
		}
		$('#main .mod-game-item [data-num=1]').css({
			left: '9.9%'
		});

		//输出最近栏HTML
		for (var i = 0; i < getJsonLength(globalData.lately); i++) {
			msg = "<div class='pull-left samll-box' data-num=" + (i+1) + "><img src=" + globalData.lately[i].icon + " alt=''></div>";
			document.querySelector('#main .mod-lately-item').innerHTML += msg;
		}
	};

	//获取JSON数据长度
	var getJsonLength = function(jsonData) {

		var jsonLength = 0;
		for (var item in jsonData) {
			jsonLength++;
		}
		return jsonLength;
	};


	/*
	 *   上下左右移动焦点函数
	 *   功能：包涵去除上一焦点变大效果，新焦点添加变大效果，左右移动位置变换
	 *   item: 焦点所在栏目
	 *   num: 焦点所在选项
	 *   keyCode: 操作方向
	 */
	var activeFun = function(item, num, keyCode) {
		var scale = null; //焦点放大比例

		//去除上一焦点样式
		$('#main [data-item=' + item + '] [data-num=' + num + ']')
			.css({
				transform: 'scale(1)',
				borderWidth: '0',
				boxShadow: '0 0 0 rgba(0, 0, 0, .0)',
				zIndex: zIndex_1
			});

		//向左移动
		if (keyCode == 37) {
			if (num != 1) {
				num--;
			}
			if (item == 1) {
				scale = 'scale(1.05)';
			} else {
				scale = 'scale(1.1)';
			}
		}
		//向右移动
		else if (keyCode == 39) {
			if (item == 1) {
				scale = 'scale(1.05)';
				if (num != getJsonLength(globalData.hot)) {
					num++;
				}
			} else if (item == 2) {
				scale = 'scale(1.1)';
				if (num != getJsonLength(globalData.game)) {
					num++;
				}
			} else if (item == 3) {
				scale = 'scale(1.1)';
				if (num != getJsonLength(globalData.lately)) {
					num++;
				}
			}
		}
		//向上移动
		else if (keyCode == 38) {
			scale = item == 2 ? 'scale(1.05)' : 'scale(1.1)';
			if (item != 0) {
				item--;
			}
		}
		//向下移动
		else if (keyCode == 40) {
			scale = (item == 0) ? 'scale(1.05)' : 'scale(1.1)';
			if (item != 3) {
				item++;
			}
		}

		if (keyCode == 37 || keyCode == 39) {
			//左右移动新焦点样式修改
			$('#main [data-item=' + item + '] [data-num=' + num + ']')
				.addClass('active')
				.css({
					transform: scale,
					border: activeBorder,
					boxShadow: activeBoxShadow,
					zIndex: zIndex_99
				})
				.siblings()
				.removeClass('active');

			//焦点左移
			if (keyCode == 37) {
				if (globalData.itemNum == 0) {
					keyState();
				}
				//视频栏
				else if (globalData.itemNum == 1) {
					//判断焦点在视频栏右边位置
					if (globalData.activeNum == globalData.movieLeftNum) {
						if (globalData.activeNum == 1) {
							keyState();
						} else if (globalData.activeNum > 1) {
							$('#main [data-item=1] [data-num=' + (globalData.activeNum - 2) + ']')
								.animate({
									left: hotImgPosition[0]
								}, speed_fast);
							$('#main [data-item=1] [data-num=' + (globalData.activeNum - 1) + ']')
								.animate({
									left: hotImgPosition[1],
									opacity: opacity_show
								}, speed_fast);
							$('#main [data-item=1] [data-num=' + globalData.activeNum + ']')
								.animate({
									left: hotImgPosition[2]
								}, speed_fast, keyState);
							$('#main [data-item=1] [data-num=' + (globalData.activeNum + 1) + ']')
								.animate({
									left: hotImgPosition[3]
								}, speed_fast);
							$('#main [data-item=1] [data-num=' + (globalData.activeNum + 2) + ']')
								.animate({
									opacity: opacity_hide
								}, speed_fast);
						} else {
							keyState();
						}
					}
					//判断焦点在视频栏第二位置
					else if (globalData.activeNum == (globalData.movieLeftNum + 1)) {
						if (globalData.activeNum == 2) {
							keyState();
						} else if (globalData.activeNum > 2) {
							$('#main [data-item=1] [data-num=' + (globalData.activeNum - 3) + ']')
								.animate({
									left: hotImgPosition[0]
								}, speed_fast);
							$('#main [data-item=1] [data-num=' + (globalData.activeNum - 2) + ']')
								.animate({
									left: hotImgPosition[1],
									opacity: opacity_show
								}, speed_fast);
							$('#main [data-item=1] [data-num=' + (globalData.activeNum - 1) + ']')
								.animate({
									left: hotImgPosition[2],
								}, speed_fast);
							$('#main [data-item=1] [data-num=' + globalData.activeNum + ']')
								.animate({
									left: hotImgPosition[3]
								}, speed_fast, keyState);
							$('#main [data-item=1] [data-num=' + (globalData.activeNum + 1) + ']')
								.animate({
									left: hotImgPosition[4]
								}, speed_fast);
							$('#main [data-item=1] [data-num=' + (globalData.activeNum + 2) + ']')
								.animate({
									opacity: opacity_hide
								}, speed_fast);
						} else {
							keyState();
						}
					} else {
						keyState();
					}
				}

				//游戏栏
				else if (globalData.itemNum == 2) {
					//判断焦点在游戏栏第一个位置
					if (globalData.activeNum == globalData.gameLeftNum) {
						//如果焦点在游戏里第一个位置
						if (globalData.activeNum == 1) {
							keyState();
						}
						//如果焦点在游戏里第二个或第二个以上位置
						else if (globalData.activeNum > 1) {
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 2) + ']')
								.animate({
									left: otherImgPosition[0]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 1) + ']')
								.animate({
									left: otherImgPosition[1],
									opacity: opacity_show
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + globalData.activeNum + ']')
								.animate({
									left: otherImgPosition[2]
								}, speed_fast, keyState);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 1) + ']')
								.animate({
									left: otherImgPosition[3]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 2) + ']')
								.animate({
									left: otherImgPosition[4]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 3) + ']')
								.animate({
									opacity: opacity_hide
								}, speed_fast);
						} else {
							keyState();
						}
					}

					//判断焦点在游戏栏第二的位置
					else if (globalData.activeNum == (globalData.gameLeftNum + 1)) {
						keyState();
					}

					//判断焦点在游戏栏第三的位置
					else if (globalData.activeNum == (globalData.gameLeftNum + 2)) {
						if (globalData.activeNum == 3) {
							keyState();
						} else if (globalData.activeNum > 3) {
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 4) + ']')
								.animate({
									left: otherImgPosition[0]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 3) + ']')
								.animate({
									left: otherImgPosition[1],
									opacity: opacity_show
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 2) + ']')
								.animate({
									left: otherImgPosition[2]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 1) + ']')
								.animate({
									left: otherImgPosition[3]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + globalData.activeNum + ']')
								.animate({
									left: otherImgPosition[4]
								}, speed_fast, keyState);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 1) + ']')
								.animate({
									left: otherImgPosition[5]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 2) + ']')
								.animate({
									opacity: opacity_hide
								}, speed_fast);
						} else {
							keyState();
						}
					} else {
						keyState();
					}
				}

				//最近栏
				else if (globalData.itemNum == 3) {
					//判断焦点在最近栏第一个位置
					if (globalData.activeNum == globalData.latelyLeftNum) {
						//如果焦点在最近里第一个位置
						if (globalData.activeNum == 1) {
							keyState();
						}
						//如果焦点在最近里第二个或第二个以上位置
						else if (globalData.activeNum > 1) {
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 2) + ']')
								.animate({
									left: otherImgPosition[0]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 1) + ']')
								.animate({
									left: otherImgPosition[1],
									opacity: opacity_show
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + globalData.activeNum + ']')
								.animate({
									left: otherImgPosition[2]
								}, speed_fast, keyState);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 1) + ']')
								.animate({
									left: otherImgPosition[3]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 2) + ']')
								.animate({
									left: otherImgPosition[4]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 3) + ']')
								.animate({
									opacity: opacity_hide
								}, speed_fast);
						} else {
							keyState();
						}
					}

					//判断焦点在最近栏第二的位置
					else if (globalData.activeNum == (globalData.latelyLeftNum + 1)) {
						keyState();
					}

					//判断焦点在最近栏第三的位置
					else if (globalData.activeNum == (globalData.latelyLeftNum + 2)) {
						if (globalData.activeNum == 3) {
							keyState();
						} else if (globalData.activeNum > 3) {
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 4) + ']')
								.animate({
									left: otherImgPosition[0]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 3) + ']')
								.animate({
									left: otherImgPosition[1],
									opacity: opacity_show
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 2) + ']')
								.animate({
									left: otherImgPosition[2]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 1) + ']')
								.animate({
									left: otherImgPosition[3]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + globalData.activeNum + ']')
								.animate({
									left: otherImgPosition[4]
								}, speed_fast, keyState);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 1) + ']')
								.animate({
									left: otherImgPosition[5]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 2) + ']')
								.animate({
									opacity: opacity_hide
								}, speed_fast);
						} else {
							keyState();
						}
					} else {
						keyState();
					}
				} else {
					keyState();
				}
			}


			//焦点右移
			if (keyCode == 39) {
				if (globalData.itemNum == 0) {
					keyState();
				}
				//视频栏
				else if (globalData.itemNum == 1) {
					//判断焦点在视频栏右边位置
					if (globalData.activeNum == globalData.movieLeftNum) {
						keyState();
					}
					//判断焦点在视频栏第二位置
					else if (globalData.activeNum == (globalData.movieLeftNum + 1)) {

						if (globalData.activeNum >= 2 && globalData.activeNum != getJsonLength(globalData.hot)) {

							$("#main [data-item=1] [data-num=" + (globalData.activeNum - 1) + "]")
								.animate({
									left: hotImgPosition[0],
									opacity: opacity_hide
								}, speed_fast);
							$("#main [data-item=1] [data-num=" + globalData.activeNum + "]")
								.animate({
									left: hotImgPosition[1]
								}, speed_fast, keyState);
							$("#main [data-item=1] [data-num=" + (globalData.activeNum + 1) + "]")
								.animate({
									left: hotImgPosition[2]
								}, speed_fast);
							$("#main [data-item=1] [data-num=" + (globalData.activeNum + 2) + "]")
								.animate({
									left: hotImgPosition[3],
									opacity: opacity_show
								}, speed_fast);
						} else if (globalData.activeNum == getJsonLength(globalData.hot)) {
							keyState();
						}
					}
				}

				//游戏栏
				else if (globalData.itemNum == 2) {
					//判断焦点在游戏栏第一个位置
					if (globalData.activeNum == globalData.gameLeftNum) {
						keyState();
					}

					//判断焦点在游戏栏第二的位置
					else if (globalData.activeNum == (globalData.gameLeftNum + 1)) {
						keyState();
					}

					//判断焦点在游戏栏第三的位置
					else if (globalData.activeNum == (globalData.gameLeftNum + 2)) {

						if (globalData.activeNum == getJsonLength(globalData.game)) {
							keyState();
						} else if (globalData.activeNum < getJsonLength(globalData.game)) {
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 2) + ']')
								.animate({
									left: otherImgPosition[0],
									opacity: opacity_hide
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 1) + ']')
								.animate({
									left: otherImgPosition[1]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + globalData.activeNum + ']')
								.animate({
									left: otherImgPosition[2]
								}, speed_fast, keyState);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 1) + ']')
								.animate({
									left: otherImgPosition[3]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 2) + ']')
								.animate({
									left: otherImgPosition[4],
									opacity: opacity_show
								}, speed_fast);
						} else {
							keyState();
						}
					} else {
						keyState();
					}
				}

				//最近栏
				else if (globalData.itemNum == 3) {
					//判断焦点在游戏栏第一个位置
					if (globalData.activeNum == globalData.latelyLeftNum) {
						keyState();
					}

					//判断焦点在游戏栏第二的位置
					else if (globalData.activeNum == (globalData.latelyLeftNum + 1)) {
						keyState();
					}

					//判断焦点在游戏栏第三的位置
					else if (globalData.activeNum == (globalData.latelyLeftNum + 2)) {
						if (globalData.activeNum == getJsonLength(globalData.lately)) {
							keyState();
						} else if (globalData.activeNum < getJsonLength(globalData.lately)) {
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 2) + ']')
								.animate({
									left: otherImgPosition[0],
									opacity: opacity_hide
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum - 1) + ']')
								.animate({
									left: otherImgPosition[1]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + globalData.activeNum + ']')
								.animate({
									left: otherImgPosition[2]
								}, speed_fast, keyState);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 1) + ']')
								.animate({
									left: otherImgPosition[3]
								}, speed_fast);
							$('#main [data-item=' + globalData.itemNum + '] [data-num=' + (globalData.activeNum + 2) + ']')
								.animate({
									left: otherImgPosition[4],
									opacity: opacity_show
								}, speed_fast);
						} else {
							keyState();
						}
					} else {
						keyState();
					}
				} else {
					keyState();
				}
			}

		}

		//方向上
		if (keyCode == 38) {

			$('#main [data-item=' + (item + 1) + '] .active')
				.removeClass('active')
				.css({
					transform: 'scale(1)',
					borderWidth: '0',
					boxShadow: '0 0 0 rgba(0, 0, 0, .0)',
					zIndex: zIndex_1
				});

			if (globalData.itemNum == 2) {
				if (globalData.activeNum == globalData.gameLeftNum) {
					num = globalData.movieLeftNum;
				} else if (globalData.activeNum == (globalData.gameLeftNum + 1)) {
					num = globalData.movieLeftNum + 1;
				} else if (globalData.activeNum == (globalData.gameLeftNum + 2)) {
					num = globalData.movieLeftNum + 1;
				}
				keyState();
			} else if (globalData.itemNum == 3) {
				if (globalData.activeNum == globalData.latelyLeftNum) {
					num = globalData.gameLeftNum;
				} else if (globalData.activeNum == (globalData.latelyLeftNum + 1)) {
					num = globalData.gameLeftNum + 1;
				} else if (globalData.activeNum == (globalData.latelyLeftNum + 2)) {
					num = globalData.gameLeftNum + 2;
				}
				keyState();
			}

			//新焦点样式修改
			$('#main [data-item=' + item + '] [data-num=' + num + ']').addClass('active')
				.css({
					transform: scale,
					border: activeBorder,
					boxShadow: activeBoxShadow,
					zIndex: zIndex_99
				});
		}

		//方向下
		if (keyCode == 40) {

			$('#main [data-item=' + globalData.itemNum + '] .active')
				.removeClass('active')
				.css({
					transform: 'scale(1)',
					borderWidth: '0',
					boxShadow: '0 0 0 rgba(0, 0, 0, .0)',
					zIndex: zIndex_1
				});

			if (globalData.itemNum == 0) {
				$('body [data-item=0] .active').removeClass('active');

				num = globalData.movieLeftNum;
			} else if (globalData.itemNum == 1) {
				if (globalData.activeNum == globalData.movieLeftNum) {
					num = globalData.gameLeftNum;
				} else if (globalData.activeNum == (globalData.movieLeftNum + 1)) {
					num = globalData.gameLeftNum + 2;
				}
			} else if (globalData.itemNum == 2) {
				if (globalData.activeNum == globalData.gameLeftNum) {
					num = globalData.latelyLeftNum;
				} else if (globalData.activeNum == (globalData.gameLeftNum + 1)) {
					num = globalData.latelyLeftNum + 1;
				} else if (globalData.activeNum == (globalData.gameLeftNum + 2)) {
					num = globalData.latelyLeftNum + 2;
				}
			}


			//新焦点样式修改
			$('#main [data-item=' + (globalData.itemNum + 1) + '] [data-num=' + num + ']').addClass('active')
				.css({
					transform: scale,
					border: activeBorder,
					boxShadow: activeBoxShadow,
					zIndex: zIndex_99
				});
		}

		/*********************************************************确认************************************************/
		if (keyCode == 13) {
			//转化数组
			var latelyArray = (localStorage.getItem('latelyArray')).split(',');
			//数组序号
			var sqlNum = globalData.activeNum - 1;
			//元素存在数组位置
			var pos;
			//设置
			if (globalData.itemNum == 0) {
				if (window["androidNative"] && typeof(window["androidNative"].tvUrl) === "function") {
					window["androidNative"].setDataJson('data');
				}
				location.href = ['app_set.html'];

			} else if (globalData.itemNum == 1) {

				//如果所选视频包含在最近栏数组中
				if($.inArray(globalData.hot[sqlNum].title, latelyArray) >= 0) {

					//获取所选在latelyArray 数组的下标
					pos = $.inArray(globalData.hot[sqlNum].title, latelyArray);
					//删除该元素
					latelyArray.splice(pos, 1);
					globalData.lately.splice(pos, 1);

					//在最后添加
					latelyArray.unshift(globalData.hot[sqlNum].title);
					globalData.lately.unshift(globalData.hot[sqlNum]);
				}
				//如果所选视频不包含在最近栏中
				else
				{
					if(latelyArray.length == 9) {
						//删除该元素
						latelyArray.splice(8, 1);
						globalData.lately.splice(8, 1);
					}

					latelyArray.unshift(globalData.hot[sqlNum].title);
					globalData.lately.unshift(globalData.hot[sqlNum]);
					
				}

				localStorage.setItem('latelyArray', latelyArray);
				localStorage.setItem('data_lately', JSON.stringify(globalData.lately));

				location.href = ['./'+globalData.hot[sqlNum].url+'&len='+ globalData.hot[sqlNum].len+'&num=1'];
			} else if (globalData.itemNum == 2) {

				//如果所选游戏包含在最近栏数组中
				if($.inArray(globalData.game[sqlNum].title, latelyArray) >= 0) {

					//获取所选在latelyArray 数组的下标
					pos = $.inArray(globalData.game[sqlNum].title, latelyArray);
					//删除该元素
					latelyArray.splice(pos, 1);
					globalData.lately.splice(pos, 1);

					//在最后添加
					latelyArray.unshift(globalData.game[sqlNum].title);
					globalData.lately.unshift(globalData.game[sqlNum]);
				}
				//如果所选游戏不包含在最近栏中
				else
				{
					if(latelyArray.length == 9) {
						//删除该元素
						latelyArray.splice(8, 1);
						globalData.lately.splice(8, 1);
					}

					latelyArray.unshift(globalData.game[sqlNum].title);
					globalData.lately.unshift(globalData.game[sqlNum]);
					
				}

				localStorage.setItem('latelyArray', latelyArray);
				localStorage.setItem('data_lately', JSON.stringify(globalData.lately));

			location.href = ['./'+globalData.game[sqlNum].url];
			} else if (globalData.itemNum == 3) {
				if(globalData.lately[globalData.activeNum-1].len) {
					location.href = ['./'+globalData.lately[globalData.activeNum-1].url+'&len='+ globalData.lately[globalData.activeNum-1].len+'&num=1'];
				}
				else
				{
					location.href = [globalData.lately[globalData.activeNum-1].url];
				}
			}
			keyState();
		}
	};


	//初始化视频，游戏，最近栏样式
	init();

	//键盘响应事件
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		//焦点所在栏目
		globalData.itemNum = parseInt($('body .active').parent().attr('data-item'));
		//焦点所在选项
		globalData.activeNum = parseInt($('#main .active').attr('data-num'));
		//获取视频栏最左边选项编号
		globalData.movieLeftNum = parseInt($(".mod-movie-item div[style*='9.9%']").attr('data-num'));
		//获取游戏栏最左边选项编号
		globalData.gameLeftNum = parseInt($(".mod-game-item div[style*='9.9%']").attr('data-num'));
		//获取最近栏最左边选项编号
		globalData.latelyLeftNum = parseInt($(".mod-lately-item div[style*='9.9%']").attr('data-num'));


		/************************************       方向上     **********************************************/
		if (e && e.keyCode == 38 && keyDownState) {
			keyDownState = false;

			//判断是否在第一栏
			if (globalData.itemNum != 1) {

				activeFun(globalData.itemNum, globalData.activeNum, 38);

				//所在栏目判断 2：游戏栏 3：最近栏
				if (globalData.itemNum == 2) {
					$('#main .nav-movie').css({
						backgroundImage: 'url(./dep/img/videodown.png)'
					});

					$('#main .nav-game').css({
						backgroundImage: 'url(./dep/img/gameup.png)'
					});
				} else if (globalData.itemNum == 3) {
					$('#main .nav-game').css({
						backgroundImage: 'url(./dep/img/gamedown.png)'
					});

					$('#main .nav-lately').css({
						backgroundImage: 'url(./dep/img/recentup.png)'
					});
				}
				keyState();
			} else if (globalData.itemNum == 1) {
				//去除上一焦点class
				$('#main [data-item=' + globalData.itemNum + '] .active').removeClass('active');

				//去除上一焦点样式
				$('#main [data-item=' + globalData.itemNum + '] [data-num=' + globalData.activeNum + ']')
					.css({
						transform: 'scale(1)',
						borderWidth: '0',
						boxShadow: '0 0 0 rgba(0, 0, 0, .0)'
					});

				$('#header .top-set')
					.addClass('active')
					.css({
						backgroundImage: 'url(./dep/img/adminis_down.png)'
					});

				$('#main .nav-movie').css({
					backgroundImage: 'url(./dep/img/videoup.png)'
				});
				keyState();
			} else {
				keyState();
			}
		}

		/************************************       方向下     **********************************************/
		if (e && e.keyCode == 40 && keyDownState) {
			keyDownState = false;
			//判断焦点是否在最下一栏
			if (globalData.itemNum != 3 && globalData.itemNum != 0) {
				//焦点函数
				activeFun(globalData.itemNum, globalData.activeNum, 40);
				keyState();

				//焦点在视频栏
				if (globalData.itemNum == 1) {
					$('#main .nav-movie').css({
						backgroundImage: 'url(./dep/img/videoup.png)'
					});

					$('#main .nav-game').css({
						backgroundImage: 'url(./dep/img/gamedown.png)'
					});
				}
				//焦点在游戏栏
				else if (globalData.itemNum == 2) {
					$('#main .nav-game').css({
						backgroundImage: 'url(./dep/img/gameup.png)'
					});

					$('#main .nav-lately').css({
						backgroundImage: 'url(./dep/img/recentdown.png)'
					});
				}
			}
			//如果焦点在设置栏
			else if (globalData.itemNum == 0) {
				//焦点函数
				activeFun(globalData.itemNum, globalData.activeNum, 40);
				keyState();

				$('#main .nav-movie').css({
					backgroundImage: 'url(./dep/img/videodown.png)'
				});

				$('body [data-item=0] .top-set').css({
					backgroundImage: 'url(./dep/img/adminis_up.png)'
				});
			} else {
				keyState();
			}
		}

		/************************************       方向左     **********************************************/
		if (e && e.keyCode == 37 && keyDownState) {
			keyDownState = false;
			//焦点函数
			activeFun(globalData.itemNum, globalData.activeNum, 37);
		}

		/************************************       方向右     **********************************************/
		if (e && e.keyCode == 39 && keyDownState) {
			keyDownState = false;
			//焦点函数
			activeFun(globalData.itemNum, globalData.activeNum, 39);
		}

		/************************************       确认     **********************************************/
		if (e && e.keyCode == 13 && keyDownState) {
			keyDownState = false;
			//焦点函数
			activeFun(globalData.itemNum, globalData.activeNum, 13);
		}

	};
});$(document).ready(function() {
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