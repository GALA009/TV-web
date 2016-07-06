//输出游戏下载列表
var downloadDataList = function() {
	//下载数据对象
	var downloadData = {};
	//下载数据数组
	var downloadDataArry = [];
	//下载数据标题数组
	var downloadDataTitleArry = [];

	var count = 0 ;

	//我的下载数据表
	globalData.getJson = JSON.parse(localStorage.getItem('getJson'));
	globalData.game = JSON.parse(localStorage.getItem('data_games'));
	if(globalData.getJson !== null) {
		for (var i = 0; i < globalData.getJson.length; i++) {
			for (var j = 0; j < getJsonLength(globalData.game); j++) {
				if (globalData.game[j].title == globalData.getJson[i].lable) {
					downloadData.id = globalData.game[j].id;
					downloadData.title = globalData.game[j].title;
					downloadData.icon = globalData.game[j].icon;
					downloadData.url = globalData.getJson[i].packName;

					localStorage.setItem('_downloadData'+count, JSON.stringify(downloadData));

					count++;
				}
			}
		}

		for (i = 0; i < count; i++) {
			var data = JSON.parse(localStorage.getItem('_downloadData'+i));
			localStorage.removeItem('_downloadData'+i);
			downloadDataArry.splice(i,0,data);
			localStorage.setItem('downloadData', JSON.stringify(downloadDataArry));

			msg = "<li class=\"pull-left set-list-item\" data-num=" + (i + 1) + "><img src=" + data.icon + " ></li>";
			document.querySelector('#myDownload .set-list').innerHTML += msg;
		}
	}
	else
	{
		$('#myDownload .set-list').append('<li class="noCollect">暂无下载</li>');
		$('#myDownload .noCollect').css({
			textAlign: 'center',
			fontSize: '2em'
		});

	}
};

downloadDataList();

$(document).ready(function() {
	var activeColor = '#1abc9c'; //元素焦点颜色
	var initColor = 'rgba(255, 255, 255, 0.3)'; //元素焦点颜色
	var keyDownState = true; //键盘按下事件 true: 可按下 false:不可按下
	var zIndex_99 = 99; //图层99
	var zIndex_1 = 1; //图层1
	var opacity_hide = "0"; //隐藏
	var opacity_show = "1"; //显示
	var activeScale = 'scale(1.1)'; //焦点图片放大
	var initScale = 'scale(1)'; //正常图片大小
	var activeBorderWidth = '.25em'; //焦点边框放大
	var initBorderWidth = '0'; //正常边框大小
	var pageNum = true; //选择栏分上、下，true表示选择栏在下边，false时表示选择栏在上边


	window.globalData = {}; //保存全局数据

	//防止键盘连续按下判断函数
	var keyState = function() {
			keyDownState = true;
		};
		//初始化
	var init = function() {
		globalData.downloadData = JSON.parse(localStorage.getItem('downloadData'));
		globalData.lately = JSON.parse(localStorage.getItem('data_lately'));
		globalData.collect = localStorage.getItem('data_collect') ? JSON.parse(localStorage.getItem('data_collect')) : [];


		if(globalData.collect.length > 0) {
			outHtml();

			$("#myCollect [data-num=1]")
				.first()
				.addClass('active')
				.css({
					borderColor: activeColor,
					borderWidth: activeBorderWidth,
					transform: activeScale
				});

		}else if (globalData.collect.length == 0) {
			pageNum = false;
			$('#header .top-collect')
			.css({
				color: activeColor,
				borderBottom: '.25em solid rgb(26, 188, 156) '
			});

			$('#header .top-download').css({
				color: initColor,
				borderBottom: initBorderWidth
			});

			$('#myCollect .set-list').append('<li class="noCollect">暂无收藏</li>');
			$('#myCollect .noCollect').css({
				textAlign: 'center',
				fontSize: '2em'
			});
		}

		$('#myDownload').hide();
	};
	//输出HTML
	var outHtml = function() {

		for (var i = 0; i < getJsonLength(globalData.collect); i++) {
			msg = "<li class=\"pull-left set-list-item\" data-num=" + (i+1) + "><img src=" + globalData.collect[i].icon + " ></li>";
			document.querySelector('#myCollect .set-list').innerHTML += msg;
		}

		$('#myCollect [data-num=1]').addClass('active');
		$("#myCollect [data-num=1]")
			.first()
			.addClass('active')
			.css({
				borderColor: '#1abc9c',
				borderWidth: '.25em',
				transform: 'scale(1.1)'
			});
		$('#myCollect [data-num=12]').nextAll().css({opacity: opacity_hide});
	};
	/*
	*	此函数用于选择我的收藏和我的下载栏目
	*	传入keyCode（键值），判断焦点位置，焦点行执行不同动作
	*
	*/
	var listSeclect = function(keyCode) {
		//选择ID前缀
		var item = (globalData.itemNum == 1) ? '#myCollect ' : '#myDownload ';

		/***********************************方向上***********************************/
		if(keyCode == 38) {
			if(globalData.activeNum<=3) {
				pageNum = false;

				if (globalData.itemNum==1) {
					$('#header [data-item=1]')
						.addClass('active')
						.css({
							color: activeColor
						})
						.siblings()
						.removeClass('active');
				}
				else if (globalData.itemNum==2) {
					$('#header [data-item=2]')
						.addClass('active')
						.css({
							color: activeColor
						})
						.siblings()
						.removeClass('active');
				}

				$(item + '[data-num=' + globalData.activeNum + ']')
					.removeClass('active')
					.css({
						transform: initScale,
						borderWidth: initBorderWidth,
						zIndex: zIndex_1
					});
					keyState();

			}
			else if(pageNum){
				$(item+'[data-num=' + (globalData.activeNum-3) + ']')
					.addClass('active')
					.css({
						transform: activeScale,
						borderWidth: activeBorderWidth,
						borderColor: activeColor,
						zIndex: zIndex_99
					})
					.siblings()
					.removeClass('active')
					.attr('style', '');
				keyState();
			}
			else if(pageNum === false) {
				keyState();
			}

		}

		/***********************************方向下***********************************/
		else if(keyCode == 40) {
			if (!pageNum) {
				if (globalData.itemNum == 1 && globalData.collect.length > 0) {
					pageNum = true;

					$('#myCollect').show();
					$('#myDownload').hide();

					$('#header .top-collect')
					.css({
						color: '#fff',
						borderBottom: '.25em solid rgb(26, 188, 156) '
					});

					$('#header .top-download').css({
						color: initColor,
						borderBottom: initBorderWidth
					});

					$(item+'[data-num=1]')
						.addClass('active')
						.css({
							color: initColor,
							transform: activeScale,
							borderWidth: activeBorderWidth,
							borderColor: activeColor,
							zIndex: zIndex_99
						});

					keyState();
				}
				else if (globalData.itemNum == 2 && globalData.downloadData !== null) {
					pageNum = true;
					$('#myCollect').hide();
					$('#myDownload').show();

					$('#header .top-download')
					.css({
						color: '#fff',
						borderBottom: '.25em solid rgb(26, 188, 156) '
					});

					$('#header .top-collect').css({
						color: initColor,
						borderBottom: initBorderWidth
					});

					$(item+'[data-num=1]')
						.addClass('active')
						.css({
							color: initColor,
							transform: activeScale,
							borderWidth: activeBorderWidth,
							borderColor: activeColor,
							zIndex: zIndex_99
						});

					keyState();
				}
				else if(globalData.downloadData === null || globalData.collect.length == 0) {
					pageNum = false;
					keyState();
				}


			}
			else {
				$(item+'[data-num=' + (globalData.activeNum+3) + ']')
					.addClass('active')
					.css({
						transform: activeScale,
						borderWidth: activeBorderWidth,
						borderColor: activeColor,
						zIndex: zIndex_99
					})
					.siblings()
					.removeClass('active')
					.attr('style', '');
				keyState();
			}

		}
		/***********************************方向左***********************************/
		else if(keyCode == 37) {
			if (pageNum) {
				$(item+'[data-num=' + (globalData.activeNum-1) + ']')
					.addClass('active')
					.css({
						transform: activeScale,
						borderWidth: activeBorderWidth,
						borderColor: activeColor,
						zIndex: zIndex_99
					})
					.siblings()
					.removeClass('active')
					.attr('style', '');
				keyState();
			}
			else {
				if(globalData.itemNum == 2) {
					$('#myCollect').show();
					$('#myDownload').hide();

					if(globalData.collect.length > 0) {
						pageNum = true;
						$('#header .top-collect')
						.addClass('active')
						.css({
							color: '#fff',
							borderBottom: '.25em solid rgb(26, 188, 156) '
						});

						$('#header .top-download')
						.removeClass('active')
						.css({
							color: initColor,
							borderBottom: initBorderWidth
						});

						$('#myCollect [data-num=1]')
							.addClass('active')
							.css({
								color: initColor,
								transform: activeScale,
								borderWidth: activeBorderWidth,
								borderColor: activeColor,
								zIndex: zIndex_99
							});
					}
					else {
						$('#header .top-collect')
						.addClass('active')
						.css({
							color: activeColor,
							borderBottom: '.25em solid rgb(26, 188, 156) '
						});

						$('#header .top-download')
						.removeClass('active')
						.css({
							color: initColor,
							borderBottom: initBorderWidth
						});

						pageNum = false;
					}

				}
				keyState();
			}
		}

		/***********************************方向右***********************************/
		else if(keyCode == 39) {
			if (pageNum) {
				$(item+'[data-num=' + (globalData.activeNum+1) + ']')
					.addClass('active')
					.css({
						transform: activeScale,
						borderWidth: activeBorderWidth,
						borderColor: activeColor,
						zIndex: zIndex_99
					})
					.siblings()
					.removeClass('active')
					.attr('style', '');
				keyState();
			}
			else {
				if(globalData.itemNum == 1) {

					$('#myCollect').hide();
					$('#myDownload').show();

					if(globalData.downloadData !== null) {
						pageNum = true;
						$('#header .top-download')
						.addClass('active')
						.css({
							color: '#fff',
							borderBottom: '.25em solid rgb(26, 188, 156) '
						});

						$('#header .top-collect')
						.removeClass('active')
						.css({
							color: initColor,
							borderBottom: initBorderWidth
						});

						$('#myDownload [data-num=1]')
							.addClass('active')
							.css({
								color: initColor,
								transform: activeScale,
								borderWidth: activeBorderWidth,
								borderColor: activeColor,
								zIndex: zIndex_99
							});
					}
					else {
						$('#header .top-collect')
						.removeClass('active')
						.css({
							color: initColor,
							borderBottom: initBorderWidth
						});

						$('#header .top-download')
						.addClass('active')
						.css({
							color: activeColor,
							borderBottom: '.25em solid rgb(26, 188, 156) '
						});

						pageNum = false;
					}
				}
				keyState();
			}
		}
		/***********************************确认***********************************/
		else if (keyCode == 13) {
			if(pageNum) {
				if(globalData.itemNum == 1) {
					//判断是否是视频
					if(globalData.collect[globalData.activeNum-1].len){
						location.href = ['./'+globalData.collect[(globalData.activeNum-1)].url+'&len='+ globalData.collect[(globalData.activeNum-1)].len]+'&num=1';
					}
					else {
						location.href = ['./'+globalData.collect[globalData.activeNum-1].url];
					}
				}
				else if (globalData.itemNum == 2) {
					if (window["androidNative"] && typeof(window["androidNative"].tvUrl) === "function") {
						window["androidNative"].openCollecteGame(globalData.downloadData[(globalData.activeNum-1)].url);
					}
				}
			}
			keyState();
		}
	};
	//初始化样式
	init();

	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		//焦点所在栏目 1:我的收藏 2：我的下载
		globalData.itemNum = parseInt($('#header .active').attr('data-item'));
		//焦点所在序号
		globalData.activeNum = parseInt($('#main .active').attr('data-num'));

		//上键
		if (e && e.keyCode == 38 && keyDownState) {
			keyDownState = false;
			listSeclect(e.keyCode);
		}
		//下键
		else if (e && e.keyCode == 40 && keyDownState) {
			keyDownState = false;
			listSeclect(e.keyCode);
		}
		//左键
		else if (e && e.keyCode == 37 && keyDownState) {
			keyDownState = false;
			listSeclect(e.keyCode);
		}
		//右键
		else if (e && e.keyCode == 39 && keyDownState) {
			keyDownState = false;
			listSeclect(e.keyCode);
		}
		//确认键
		else if (e && e.keyCode == 13 && keyDownState) {
			keyDownState = false;
			listSeclect(e.keyCode);
		}
		//返回键
		else if (e && e.keyCode == 8 && keyDownState) {
			keyDownState = false;
			listSeclect(e.keyCode);
		}
	};
});