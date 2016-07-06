/*! This is 每日TV  - 2016-06-22 */var downloadDataList = function() {
    var a = {}, b = [], c = 0;
    if (globalData.getJson = JSON.parse(localStorage.getItem("getJson")), globalData.game = JSON.parse(localStorage.getItem("data_games")), 
    null !== globalData.getJson) {
        for (var d = 0; d < globalData.getJson.length; d++) for (var e = 0; e < getJsonLength(globalData.game); e++) globalData.game[e].title == globalData.getJson[d].lable && (a.id = globalData.game[e].id, 
        a.title = globalData.game[e].title, a.icon = globalData.game[e].icon, a.url = globalData.getJson[d].packName, 
        localStorage.setItem("_downloadData" + c, JSON.stringify(a)), c++);
        for (d = 0; c > d; d++) {
            var f = JSON.parse(localStorage.getItem("_downloadData" + d));
            localStorage.removeItem("_downloadData" + d), b.splice(d, 0, f), localStorage.setItem("downloadData", JSON.stringify(b)), 
            msg = '<li class="pull-left set-list-item" data-num=' + (d + 1) + "><img src=" + f.icon + " ></li>", 
            document.querySelector("#myDownload .set-list").innerHTML += msg;
        }
    } else $("#myDownload .set-list").append('<li class="noCollect">暂无下载</li>'), $("#myDownload .noCollect").css({
        textAlign: "center",
        fontSize: "2em"
    });
};

downloadDataList(), $(document).ready(function() {
    var a = "#1abc9c", b = "rgba(255, 255, 255, 0.3)", c = !0, d = 99, e = 1, f = "0", g = "scale(1.1)", h = "scale(1)", i = ".25em", j = "0", k = !0;
    window.globalData = {};
    var l = function() {
        c = !0;
    }, m = function() {
        globalData.downloadData = JSON.parse(localStorage.getItem("downloadData")), globalData.lately = JSON.parse(localStorage.getItem("data_lately")), 
        globalData.collect = localStorage.getItem("data_collect") ? JSON.parse(localStorage.getItem("data_collect")) : [], 
        globalData.collect.length > 0 ? (n(), $("#myCollect [data-num=1]").first().addClass("active").css({
            borderColor: a,
            borderWidth: i,
            transform: g
        })) : 0 == globalData.collect.length && (k = !1, $("#header .top-collect").css({
            color: a,
            borderBottom: ".25em solid rgb(26, 188, 156) "
        }), $("#header .top-download").css({
            color: b,
            borderBottom: j
        }), $("#myCollect .set-list").append('<li class="noCollect">暂无收藏</li>'), $("#myCollect .noCollect").css({
            textAlign: "center",
            fontSize: "2em"
        })), $("#myDownload").hide();
    }, n = function() {
        for (var a = 0; a < getJsonLength(globalData.collect); a++) msg = '<li class="pull-left set-list-item" data-num=' + (a + 1) + "><img src=" + globalData.collect[a].icon + " ></li>", 
        document.querySelector("#myCollect .set-list").innerHTML += msg;
        $("#myCollect [data-num=1]").addClass("active"), $("#myCollect [data-num=1]").first().addClass("active").css({
            borderColor: "#1abc9c",
            borderWidth: ".25em",
            transform: "scale(1.1)"
        }), $("#myCollect [data-num=12]").nextAll().css({
            opacity: f
        });
    }, o = function(c) {
        var f = 1 == globalData.itemNum ? "#myCollect " : "#myDownload ";
        38 == c ? globalData.activeNum <= 3 ? (k = !1, 1 == globalData.itemNum ? $("#header [data-item=1]").addClass("active").css({
            color: a
        }).siblings().removeClass("active") : 2 == globalData.itemNum && $("#header [data-item=2]").addClass("active").css({
            color: a
        }).siblings().removeClass("active"), $(f + "[data-num=" + globalData.activeNum + "]").removeClass("active").css({
            transform: h,
            borderWidth: j,
            zIndex: e
        }), l()) : k ? ($(f + "[data-num=" + (globalData.activeNum - 3) + "]").addClass("active").css({
            transform: g,
            borderWidth: i,
            borderColor: a,
            zIndex: d
        }).siblings().removeClass("active").attr("style", ""), l()) : k === !1 && l() : 40 == c ? k ? ($(f + "[data-num=" + (globalData.activeNum + 3) + "]").addClass("active").css({
            transform: g,
            borderWidth: i,
            borderColor: a,
            zIndex: d
        }).siblings().removeClass("active").attr("style", ""), l()) : 1 == globalData.itemNum && globalData.collect.length > 0 ? (k = !0, 
        $("#myCollect").show(), $("#myDownload").hide(), $("#header .top-collect").css({
            color: "#fff",
            borderBottom: ".25em solid rgb(26, 188, 156) "
        }), $("#header .top-download").css({
            color: b,
            borderBottom: j
        }), $(f + "[data-num=1]").addClass("active").css({
            color: b,
            transform: g,
            borderWidth: i,
            borderColor: a,
            zIndex: d
        }), l()) : 2 == globalData.itemNum && null !== globalData.downloadData ? (k = !0, 
        $("#myCollect").hide(), $("#myDownload").show(), $("#header .top-download").css({
            color: "#fff",
            borderBottom: ".25em solid rgb(26, 188, 156) "
        }), $("#header .top-collect").css({
            color: b,
            borderBottom: j
        }), $(f + "[data-num=1]").addClass("active").css({
            color: b,
            transform: g,
            borderWidth: i,
            borderColor: a,
            zIndex: d
        }), l()) : null !== globalData.downloadData && 0 != globalData.collect.length || (k = !1, 
        l()) : 37 == c ? k ? ($(f + "[data-num=" + (globalData.activeNum - 1) + "]").addClass("active").css({
            transform: g,
            borderWidth: i,
            borderColor: a,
            zIndex: d
        }).siblings().removeClass("active").attr("style", ""), l()) : (2 == globalData.itemNum && ($("#myCollect").show(), 
        $("#myDownload").hide(), globalData.collect.length > 0 ? (k = !0, $("#header .top-collect").addClass("active").css({
            color: "#fff",
            borderBottom: ".25em solid rgb(26, 188, 156) "
        }), $("#header .top-download").removeClass("active").css({
            color: b,
            borderBottom: j
        }), $("#myCollect [data-num=1]").addClass("active").css({
            color: b,
            transform: g,
            borderWidth: i,
            borderColor: a,
            zIndex: d
        })) : ($("#header .top-collect").addClass("active").css({
            color: a,
            borderBottom: ".25em solid rgb(26, 188, 156) "
        }), $("#header .top-download").removeClass("active").css({
            color: b,
            borderBottom: j
        }), k = !1)), l()) : 39 == c ? k ? ($(f + "[data-num=" + (globalData.activeNum + 1) + "]").addClass("active").css({
            transform: g,
            borderWidth: i,
            borderColor: a,
            zIndex: d
        }).siblings().removeClass("active").attr("style", ""), l()) : (1 == globalData.itemNum && ($("#myCollect").hide(), 
        $("#myDownload").show(), null !== globalData.downloadData ? (k = !0, $("#header .top-download").addClass("active").css({
            color: "#fff",
            borderBottom: ".25em solid rgb(26, 188, 156) "
        }), $("#header .top-collect").removeClass("active").css({
            color: b,
            borderBottom: j
        }), $("#myDownload [data-num=1]").addClass("active").css({
            color: b,
            transform: g,
            borderWidth: i,
            borderColor: a,
            zIndex: d
        })) : ($("#header .top-collect").removeClass("active").css({
            color: b,
            borderBottom: j
        }), $("#header .top-download").addClass("active").css({
            color: a,
            borderBottom: ".25em solid rgb(26, 188, 156) "
        }), k = !1)), l()) : 13 == c && (k && (1 == globalData.itemNum ? globalData.collect[globalData.activeNum - 1].len ? location.href = [ "./" + globalData.collect[globalData.activeNum - 1].url + "&len=" + globalData.collect[globalData.activeNum - 1].len ] + "&num=1" : location.href = [ "./" + globalData.collect[globalData.activeNum - 1].url ] : 2 == globalData.itemNum && window.androidNative && "function" == typeof window.androidNative.tvUrl && window.androidNative.openCollecteGame(globalData.downloadData[globalData.activeNum - 1].url)), 
        l());
    };
    m(), document.onkeydown = function(a) {
        var b = a || window.event || arguments.callee.caller.arguments[0];
        globalData.itemNum = parseInt($("#header .active").attr("data-item")), globalData.activeNum = parseInt($("#main .active").attr("data-num")), 
        b && 38 == b.keyCode && c ? (c = !1, o(b.keyCode)) : b && 40 == b.keyCode && c ? (c = !1, 
        o(b.keyCode)) : b && 37 == b.keyCode && c ? (c = !1, o(b.keyCode)) : b && 39 == b.keyCode && c ? (c = !1, 
        o(b.keyCode)) : b && 13 == b.keyCode && c ? (c = !1, o(b.keyCode)) : b && 8 == b.keyCode && c && (c = !1, 
        o(b.keyCode));
    };
});