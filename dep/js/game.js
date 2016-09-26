/*! This is TV盒子  - 2016-07-24 */$(document).ready(function() {
    var a = "#1abc9c", b = "rgba(255, 255, 255, 0.3)", c = !0;
    window.globalData = {}, globalData.collectState = !0, globalData.gameState = !0, 
    globalData.collect = localStorage.getItem("data_collect") ? JSON.parse(localStorage.getItem("data_collect")) : [], 
    globalData.game = JSON.parse(localStorage.getItem("data_games")), globalData.lately = JSON.parse(localStorage.getItem("data_lately"));
    var d = function() {
        c = !0;
    }, e = function() {
        for (var a = {}, b = location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("=");
            if (-1 != e) {
                var f = c[d].substring(0, e), g = c[d].substring(e + 1);
                g = decodeURIComponent(g), a[f] = g;
            }
        }
        return a;
    }, f = function() {
        globalData.url = e(), $.each(globalData.collect, function(a, b) {
            b.title == globalData.game[globalData.url.id - 1].title && (globalData.collectState = !1, 
            globalData.collectId = b.id);
        }), globalData.collectState || $("#main .nav-btn-collect-game span").text("取消收藏"), 
        $("#header .top-title").text(globalData.game[globalData.url.id - 1].title), $("#main .mod-game").css({
            backgroundImage: "url(" + globalData.game[globalData.url.id - 1].bg_image + ")"
        }), $("#main [data-item=3]").addClass("active").css({
            borderWidth: "0.25em",
            borderStyle: "solid",
            borderColor: a
        }), $("#main .nav-btn-download-game span").text("下载游戏"), $("#main .full-play").show();
    };
    f(), document.onkeydown = function(e) {
        var f = e || window.event || arguments.callee.caller.arguments[0];
        if (globalData.itemNum = parseInt($("#main .active").attr("data-item")), f && 38 == f.keyCode && c) 1 == globalData.itemNum ? d() : 2 == globalData.itemNum && ($("#main [data-item=" + (globalData.itemNum - 1) + "]").addClass("active").css({
            backgroundColor: a
        }).siblings().removeClass("active").css({
            backgroundColor: b
        }), d()); else if (f && 40 == f.keyCode && c) 1 == globalData.itemNum ? ($("#main [data-item=" + (globalData.itemNum + 1) + "]").addClass("active").css({
            backgroundColor: a
        }).siblings().removeClass("active").css({
            backgroundColor: b
        }), d()) : 2 == globalData.itemNum && d(); else if (f && 37 == f.keyCode && c) $("#main [data-item=1]").addClass("active").css({
            backgroundColor: a
        }), $("#main [data-item=3]").removeClass("active").css({
            borderWidth: "0"
        }), $("#main .mod-game iframe").blur(), d(); else if (f && 39 == f.keyCode && c) $("#main [data-item=" + globalData.itemNum + "]").removeClass("active").css({
            backgroundColor: b
        }), $("#main [data-item=3]").addClass("active").css({
            borderWidth: "0.25em",
            borderStyle: "solid",
            borderColor: a
        }), d(); else if (f && 13 == f.keyCode && c) {
            if (1 == globalData.itemNum) {
                "" == localStorage.getItem("collectArray") ? globalData.collectArray = [] : globalData.collectArray = localStorage.getItem("collectArray").split(",");
                var g = $.inArray(globalData.game[globalData.url.id - 1].title, globalData.collectArray);
                g >= 0 ? (globalData.collectArray.splice(g, 1), globalData.collect.splice(g, 1), 
                localStorage.setItem("collectArray", globalData.collectArray), localStorage.setItem("data_collect", JSON.stringify(globalData.collect)), 
                $("#main .nav-btn-collect-game span").text("收藏"), globalData.collectState = !1) : (globalData.collectArray.unshift(globalData.game[globalData.url.id - 1].title), 
                globalData.collect.unshift(globalData.game[globalData.url.id - 1]), localStorage.setItem("collectArray", globalData.collectArray), 
                localStorage.setItem("data_collect", JSON.stringify(globalData.collect)), $("#main .nav-btn-collect-game span").text("取消收藏"), 
                globalData.collectState = !0);
            } else 2 == globalData.itemNum ? window.androidNative && "function" == typeof window.androidNative.tvUrl && window.androidNative.downLoad(globalData.game[globalData.url.id - 1].download_url, globalData.game[globalData.url.id - 1].title) : 3 == globalData.itemNum && ($("#main [data-item=3]").addClass("active").css({
                borderWidth: "0.25em",
                borderStyle: "solid",
                borderColor: b
            }), $("#main .full-play").hide(), location.href = [ globalData.game[globalData.url.id - 1].game_url ]);
            d();
        } else f && 8 == f.keyCode && c && (location.href = "index.html", d());
    };
});