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
});