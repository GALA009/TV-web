/*! This is 每日TV  - 2016-07-06 */$(document).ready(function() {
    var a = "#1abc9c", b = "rgba(255, 255, 255, 0.3)", c = !0, d = "0", e = "1", f = "fast", g = [ "-9.22%", "0", "9.22%", "18.44%", "27.66%", "36.88%", "46.1%", "55.32%", "64.54%", "73.76%", "82.98%", "92.2%" ];
    window.globalData = {}, globalData.collectState = !0, globalData.collect = localStorage.getItem("data_collect") ? JSON.parse(localStorage.getItem("data_collect")) : [], 
    globalData.hot = JSON.parse(localStorage.getItem("data_movies"));
    var h = function() {
        c = !0;
    }, i = function() {
        for (var a = {}, b = location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("=");
            if (-1 != e) {
                var f = c[d].substring(0, e), g = c[d].substring(e + 1);
                g = decodeURIComponent(g), a[f] = g;
            }
        }
        return a;
    }, j = function() {
        for (globalData.url = i(), 1 == globalData.url.id ? globalData.movieUrl = "baixiangnameduo" : 2 == globalData.url.id ? globalData.movieUrl = "lvyoudaren" : 3 == globalData.url.id ? globalData.movieUrl = "zhongcaidaren" : 4 == globalData.url.id ? globalData.movieUrl = "pastadaren" : 5 == globalData.url.id ? globalData.movieUrl = "yundongdaren" : 6 == globalData.url.id && (globalData.movieUrl = "xiaobaiduanpian"), 
        $.each(globalData.collect, function(a, b) {
            b.title == globalData.hot[globalData.url.id - 1].title && (globalData.collectState = !1, 
            globalData.collectId = b.id);
        }), globalData.collectState || $("#main [data-item=2] span").text("取消追剧"), globalData.seclectNum = globalData.url.num, 
        $("#main [data-item=4]").addClass("active").css({
            borderWidth: "0.25em",
            borderStyle: "solid",
            borderColor: a
        }), b = 1; b <= globalData.url.len; b++) msg = '<li class="movie-num-item" data-num=\'' + b + "'><span>第" + b + "集</span></li>", 
        document.querySelector("#main .list-unstyled").innerHTML += msg;
        for (var b = 1; 11 > b; b++) $("#main .movie-num [data-num=" + b + "]").css("top", g[b]);
        $("#main .movie-num [data-num=10]").nextAll().css({
            opacity: d,
            top: g[11]
        }), $(".mod-detail .bg-img").css({
            height: "100%",
            backgroundImage: "url(" + globalData.hot[globalData.url.id - 1].icon + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
        }), $("#header .top-title").text(globalData.hot[globalData.url.id - 1].title), globalData.movieItemLeng = $(".movie-num ul").children(".movie-num-item").length, 
        $("#main .movie-num").hide();
    }, k = function(a) {
        if (globalData.seclectItemTop = parseInt($("#main .movie-num li[style*='top: 0px']").attr("data-num")), 
        globalData.seclectItemBottom = parseInt($("#main .movie-num li[style*='top: 82.98%']").attr("data-num")), 
        38 == a) 1 == globalData.seclectNum ? h() : globalData.seclectNum > 1 && (globalData.seclectNum == globalData.seclectItemTop ? ($("#main .movie-num [data-num=" + (globalData.seclectNum + 9) + "]").animate({
            top: g[11],
            opacity: d
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum + 8) + "]").animate({
            top: g[10]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum + 7) + "]").animate({
            top: g[9]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum + 6) + "]").animate({
            top: g[8]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum + 5) + "]").animate({
            top: g[7]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum + 4) + "]").animate({
            top: g[6]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum + 3) + "]").animate({
            top: g[5]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum + 2) + "]").animate({
            top: g[4]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum + 1) + "]").animate({
            top: g[3]
        }, f), $("#main .movie-num [data-num=" + globalData.seclectNum + "]").animate({
            top: g[2]
        }, f, h), $("#main .movie-num [data-num=" + (globalData.seclectNum - 1) + "]").animate({
            top: g[1],
            opacity: e
        }, f), globalData.seclectNum == globalData.movieItemLeng - 9 && $("#main .movie-next").show()) : h()); else if (40 == a) globalData.seclectNum == globalData.movieItemLeng ? h() : globalData.seclectNum < globalData.movieItemLeng && (globalData.seclectNum == globalData.seclectItemBottom ? ($("#main .movie-num [data-num=" + (globalData.seclectNum - 9) + "]").animate({
            top: g[0],
            opacity: d
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum - 8) + "]").animate({
            top: g[1]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum - 7) + "]").animate({
            top: g[2]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum - 6) + "]").animate({
            top: g[3]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum - 5) + "]").animate({
            top: g[4]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum - 4) + "]").animate({
            top: g[5]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum - 3) + "]").animate({
            top: g[6]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum - 2) + "]").animate({
            top: g[7]
        }, f), $("#main .movie-num [data-num=" + (globalData.seclectNum - 1) + "]").animate({
            top: g[8]
        }, f), $("#main .movie-num [data-num=" + globalData.seclectNum + "]").animate({
            top: g[9]
        }, f, h), $("#main .movie-num [data-num=" + (globalData.seclectNum + 1) + "]").animate({
            top: g[10],
            opacity: e
        }, f), globalData.seclectNum == globalData.movieItemLeng - 1 && $("#main .movie-next").hide()) : h()); else if (37 == a) {
            $("#main .movie-num li").css("opacity", e);
            for (var b = 1; 11 > b; b++) $("#main .movie-num [data-num=" + b + "]").css("top", g[b]);
            $("#main .movie-num [data-num=10]").nextAll().css({
                opacity: d,
                top: g[11]
            }), h();
        } else 13 == a && (location.href = [ "./movie.html?id=" + globalData.url.id + "&len=" + globalData.url.len + "&num=" + globalData.seclectNum ], 
        h());
    }, l = function(d) {
        if (38 == d && c) c = !1, 1 == globalData.itemNum ? h() : 2 == globalData.itemNum || 3 == globalData.itemNum ? ($("#main [data-item=" + (globalData.itemNum - 1) + "]").addClass("active").css({
            backgroundColor: a
        }).siblings().removeClass("active").css({
            backgroundColor: b
        }), h()) : isNaN(globalData.itemNum) ? 1 == globalData.seclectNum ? h() : globalData.seclectNum > 1 && ($("#main [data-item=5] [data-num=" + (globalData.seclectNum - 1) + "]").addClass("active").css({
            backgroundColor: a
        }).siblings().removeClass("active").css({
            backgroundColor: b
        }), k(d)) : h(); else if (40 == d && c) c = !1, 3 == globalData.itemNum ? h() : 1 == globalData.itemNum || 2 == globalData.itemNum ? ($("#main [data-item=" + (globalData.itemNum + 1) + "]").addClass("active").css({
            backgroundColor: a
        }).siblings().removeClass("active").css({
            backgroundColor: b
        }), h()) : isNaN(globalData.itemNum) ? globalData.seclectNum == globalData.movieItemLeng ? h() : globalData.seclectNum < globalData.movieItemLeng && ($("#main [data-item=5] [data-num=" + (globalData.seclectNum + 1) + "]").addClass("active").css({
            backgroundColor: a
        }).siblings().removeClass("active").css({
            backgroundColor: b
        }), k(d)) : h(); else if (37 == d && c) c = !1, 1 == globalData.itemNum || 2 == globalData.itemNum || 3 == globalData.itemNum ? h() : 4 != globalData.itemNum && isNaN(globalData.itemNum) ? isNaN(globalData.itemNum) && (k(d), 
        $("#main [data-item=1]").addClass("active").css({
            backgroundColor: a
        }), $("#main [data-item=5] .active").css({
            backgroundColor: b
        }).removeClass("active"), $("#main .movie-num").hide()) : ($("#main [data-item=1]").addClass("active").css({
            backgroundColor: a
        }), $("#main [data-item=" + globalData.itemNum + "]").css({
            borderWidth: "0"
        }).removeClass("active"), h()); else if (39 == d && c) console.log("globalData.itemNum->" + globalData.itemNum), 
        c = !1, 1 == globalData.itemNum || 2 == globalData.itemNum ? ($("#main [data-item=4]").addClass("active").css({
            borderWidth: "0.25em",
            borderStyle: "solid",
            borderColor: a
        }), $("#main [data-item=" + globalData.itemNum + "]").removeClass("active").css({
            backgroundColor: b
        }), h()) : 4 != globalData.itemNum && isNaN(globalData.itemNum) ? isNaN(globalData.itemNum) && h() : h(); else if (13 == d && c) if (c = !1, 
        1 == globalData.itemNum) $("#main .movie-num").show(), $("#main [data-item=5] [data-num=1]").addClass("active").css({
            backgroundColor: a
        }), $("#main [data-item=1]").removeClass("active").css({
            backgroundColor: b
        }), globalData.movieItemLeng <= 10 ? $("#main .movie-next").hide() : $("#main .movie-next").show(), 
        h(); else if (2 == globalData.itemNum) {
            var e = localStorage.getItem("collectArray").split(","), f = $.inArray(globalData.hot[globalData.url.id - 1].title, e);
            f >= 0 ? (e.splice(f, 1), globalData.collect.splice(f, 1), localStorage.setItem("collectArray", e), 
            localStorage.setItem("data_collect", JSON.stringify(globalData.collect)), $("#main [data-item=" + globalData.itemNum + "] span").text("追剧"), 
            globalData.collectState = !1) : (e.unshift(globalData.hot[globalData.url.id - 1].title), 
            globalData.collect.unshift(globalData.hot[globalData.url.id - 1]), localStorage.setItem("collectArray", e), 
            localStorage.setItem("data_collect", JSON.stringify(globalData.collect)), $("#main [data-item=" + globalData.itemNum + "] span").text("取消追剧"), 
            globalData.collectState = !0), h();
        } else 4 == globalData.itemNum ? (location.href = [ "./movie_full.html?id=" + globalData.url.id + "&len=" + globalData.url.len + "&num=" + globalData.url.num ], 
        h()) : isNaN(globalData.itemNum) && k(d); else 8 == d && c && (c = !1, isNaN(globalData.itemNum) ? ($("#main [data-item=1]").addClass("active").css({
            backgroundColor: a
        }), $("#main [data-item=5] .active").css({
            backgroundColor: b
        }).removeClass("active"), $("#main .movie-num").hide()) : isNaN(globalData.seclectNum) && !isNaN(globalData.itemNum) && (localStorage.removeItem("playTime"), 
        location.href = "index.html"), h());
    };
    j(), document.onkeydown = function(a) {
        var b = a || window.event || arguments.callee.caller.arguments[0];
        globalData.itemNum = parseInt($("#main .active").attr("data-item")), globalData.seclectNum = parseInt($("#main .movie-num .active").attr("data-num")), 
        l(b.keyCode);
    };
});