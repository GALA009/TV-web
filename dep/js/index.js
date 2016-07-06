/*! This is 每日TV  - 2016-06-22 */function getJson(a) {
    globalData.getJson = a, localStorage.setItem("getJson", globalData.getJson), globalData.getJsonTest = JSON.parse(localStorage.getItem("getJson"));
}

window.globalData = {}, $(document).ready(function() {
    var a = "fast", b = "0", c = "1", d = !0, e = 99, f = 1, g = [ "0", "9.9%", "50%", "90.1%", "130.2%" ], h = [ "0", "9.9%", "35.94%", "61.97%", "88.02%", "103.6%" ], i = ".25em .25em .63em rgba(0, 0, 0, 0.8)", j = ".1em solid #1abc9c", k = function() {
        d = !0;
    }, l = function() {
        globalData.hot = JSON.parse(localStorage.getItem("data_movies")), globalData.game = JSON.parse(localStorage.getItem("data_games")), 
        globalData.lately = JSON.parse(localStorage.getItem("data_lately"));
        var a = localStorage.getItem("data_movies"), b = localStorage.getItem("data_games");
        globalData.allData = JSON.parse(a.concat(b).replace(/\]\[/g, ",")), localStorage.setItem("allData", JSON.stringify(globalData.allData)), 
        m(), $(".mod-movie-item div").first().css("left", g[1]), $(".mod-game-item div").first().css("left", h[1]), 
        $(".mod-lately-item div").first().css("left", h[1]), $("#main .mod-hot [data-num=3]").nextAll().css({
            left: g[4]
        }), $("#main .mod-other [data-num=4]").nextAll().css({
            left: h[5]
        });
    }, m = function() {
        for (a = 0; a < n(globalData.hot); a++) msg = "<div class='pull-left big-box' data-num=" + (a + 1) + "><img src=" + globalData.hot[a].icon + " alt=''></div>", 
        document.querySelector("#main .mod-movie-item").innerHTML += msg;
        for ($("#main .mod-movie-item [data-num=1]").css({
            left: "9.9%"
        }).addClass("active"), a = 0; a < n(globalData.game); a++) msg = "<div class='pull-left samll-box' data-num=" + (a + 1) + "><img src=" + globalData.game[a].icon + " alt=''></div>", 
        document.querySelector("#main .mod-game-item").innerHTML += msg;
        $("#main .mod-game-item [data-num=1]").css({
            left: "9.9%"
        });
        for (var a = 0; a < n(globalData.lately); a++) msg = "<div class='pull-left samll-box' data-num=" + (a + 1) + "><img src=" + globalData.lately[a].icon + " alt=''></div>", 
        document.querySelector("#main .mod-lately-item").innerHTML += msg;
    }, n = function(a) {
        var b = 0;
        for (var c in a) b++;
        return b;
    }, o = function(d, l, m) {
        var o = null;
        if ($("#main [data-item=" + d + "] [data-num=" + l + "]").css({
            transform: "scale(1)",
            borderWidth: "0",
            boxShadow: "0 0 0 rgba(0, 0, 0, .0)",
            zIndex: f
        }), 37 == m ? (1 != l && l--, o = 1 == d ? "scale(1.05)" : "scale(1.1)") : 39 == m ? 1 == d ? (o = "scale(1.05)", 
        l != n(globalData.hot) && l++) : 2 == d ? (o = "scale(1.1)", l != n(globalData.game) && l++) : 3 == d && (o = "scale(1.1)", 
        l != n(globalData.lately) && l++) : 38 == m ? (o = 2 == d ? "scale(1.05)" : "scale(1.1)", 
        0 != d && d--) : 40 == m && (o = 0 == d ? "scale(1.05)" : "scale(1.1)", 3 != d && d++), 
        37 != m && 39 != m || ($("#main [data-item=" + d + "] [data-num=" + l + "]").addClass("active").css({
            transform: o,
            border: j,
            boxShadow: i,
            zIndex: e
        }).siblings().removeClass("active"), 37 == m && (0 == globalData.itemNum ? k() : 1 == globalData.itemNum ? globalData.activeNum == globalData.movieLeftNum ? 1 == globalData.activeNum ? k() : globalData.activeNum > 1 ? ($("#main [data-item=1] [data-num=" + (globalData.activeNum - 2) + "]").animate({
            left: g[0]
        }, a), $("#main [data-item=1] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: g[1],
            opacity: c
        }, a), $("#main [data-item=1] [data-num=" + globalData.activeNum + "]").animate({
            left: g[2]
        }, a, k), $("#main [data-item=1] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: g[3]
        }, a), $("#main [data-item=1] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            opacity: b
        }, a)) : k() : globalData.activeNum == globalData.movieLeftNum + 1 ? 2 == globalData.activeNum ? k() : globalData.activeNum > 2 ? ($("#main [data-item=1] [data-num=" + (globalData.activeNum - 3) + "]").animate({
            left: g[0]
        }, a), $("#main [data-item=1] [data-num=" + (globalData.activeNum - 2) + "]").animate({
            left: g[1],
            opacity: c
        }, a), $("#main [data-item=1] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: g[2]
        }, a), $("#main [data-item=1] [data-num=" + globalData.activeNum + "]").animate({
            left: g[3]
        }, a, k), $("#main [data-item=1] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: g[4]
        }, a), $("#main [data-item=1] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            opacity: b
        }, a)) : k() : k() : 2 == globalData.itemNum ? globalData.activeNum == globalData.gameLeftNum ? 1 == globalData.activeNum ? k() : globalData.activeNum > 1 ? ($("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 2) + "]").animate({
            left: h[0]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: h[1],
            opacity: c
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + globalData.activeNum + "]").animate({
            left: h[2]
        }, a, k), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: h[3]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            left: h[4]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 3) + "]").animate({
            opacity: b
        }, a)) : k() : globalData.activeNum == globalData.gameLeftNum + 1 ? k() : globalData.activeNum == globalData.gameLeftNum + 2 ? 3 == globalData.activeNum ? k() : globalData.activeNum > 3 ? ($("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 4) + "]").animate({
            left: h[0]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 3) + "]").animate({
            left: h[1],
            opacity: c
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 2) + "]").animate({
            left: h[2]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: h[3]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + globalData.activeNum + "]").animate({
            left: h[4]
        }, a, k), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: h[5]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            opacity: b
        }, a)) : k() : k() : 3 == globalData.itemNum ? globalData.activeNum == globalData.latelyLeftNum ? 1 == globalData.activeNum ? k() : globalData.activeNum > 1 ? ($("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 2) + "]").animate({
            left: h[0]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: h[1],
            opacity: c
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + globalData.activeNum + "]").animate({
            left: h[2]
        }, a, k), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: h[3]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            left: h[4]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 3) + "]").animate({
            opacity: b
        }, a)) : k() : globalData.activeNum == globalData.latelyLeftNum + 1 ? k() : globalData.activeNum == globalData.latelyLeftNum + 2 ? 3 == globalData.activeNum ? k() : globalData.activeNum > 3 ? ($("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 4) + "]").animate({
            left: h[0]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 3) + "]").animate({
            left: h[1],
            opacity: c
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 2) + "]").animate({
            left: h[2]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: h[3]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + globalData.activeNum + "]").animate({
            left: h[4]
        }, a, k), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: h[5]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            opacity: b
        }, a)) : k() : k() : k()), 39 == m && (0 == globalData.itemNum ? k() : 1 == globalData.itemNum ? globalData.activeNum == globalData.movieLeftNum ? k() : globalData.activeNum == globalData.movieLeftNum + 1 && (globalData.activeNum >= 2 && globalData.activeNum != n(globalData.hot) ? ($("#main [data-item=1] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: g[0],
            opacity: b
        }, a), $("#main [data-item=1] [data-num=" + globalData.activeNum + "]").animate({
            left: g[1]
        }, a, k), $("#main [data-item=1] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: g[2]
        }, a), $("#main [data-item=1] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            left: g[3],
            opacity: c
        }, a)) : globalData.activeNum == n(globalData.hot) && k()) : 2 == globalData.itemNum ? globalData.activeNum == globalData.gameLeftNum ? k() : globalData.activeNum == globalData.gameLeftNum + 1 ? k() : globalData.activeNum == globalData.gameLeftNum + 2 ? globalData.activeNum == n(globalData.game) ? k() : globalData.activeNum < n(globalData.game) ? ($("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 2) + "]").animate({
            left: h[0],
            opacity: b
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: h[1]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + globalData.activeNum + "]").animate({
            left: h[2]
        }, a, k), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: h[3]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            left: h[4],
            opacity: c
        }, a)) : k() : k() : 3 == globalData.itemNum ? globalData.activeNum == globalData.latelyLeftNum ? k() : globalData.activeNum == globalData.latelyLeftNum + 1 ? k() : globalData.activeNum == globalData.latelyLeftNum + 2 ? globalData.activeNum == n(globalData.lately) ? k() : globalData.activeNum < n(globalData.lately) ? ($("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 2) + "]").animate({
            left: h[0],
            opacity: b
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum - 1) + "]").animate({
            left: h[1]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + globalData.activeNum + "]").animate({
            left: h[2]
        }, a, k), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 1) + "]").animate({
            left: h[3]
        }, a), $("#main [data-item=" + globalData.itemNum + "] [data-num=" + (globalData.activeNum + 2) + "]").animate({
            left: h[4],
            opacity: c
        }, a)) : k() : k() : k())), 38 == m && ($("#main [data-item=" + (d + 1) + "] .active").removeClass("active").css({
            transform: "scale(1)",
            borderWidth: "0",
            boxShadow: "0 0 0 rgba(0, 0, 0, .0)",
            zIndex: f
        }), 2 == globalData.itemNum ? (globalData.activeNum == globalData.gameLeftNum ? l = globalData.movieLeftNum : globalData.activeNum == globalData.gameLeftNum + 1 ? l = globalData.movieLeftNum + 1 : globalData.activeNum == globalData.gameLeftNum + 2 && (l = globalData.movieLeftNum + 1), 
        k()) : 3 == globalData.itemNum && (globalData.activeNum == globalData.latelyLeftNum ? l = globalData.gameLeftNum : globalData.activeNum == globalData.latelyLeftNum + 1 ? l = globalData.gameLeftNum + 1 : globalData.activeNum == globalData.latelyLeftNum + 2 && (l = globalData.gameLeftNum + 2), 
        k()), $("#main [data-item=" + d + "] [data-num=" + l + "]").addClass("active").css({
            transform: o,
            border: j,
            boxShadow: i,
            zIndex: e
        })), 40 == m && ($("#main [data-item=" + globalData.itemNum + "] .active").removeClass("active").css({
            transform: "scale(1)",
            borderWidth: "0",
            boxShadow: "0 0 0 rgba(0, 0, 0, .0)",
            zIndex: f
        }), 0 == globalData.itemNum ? ($("body [data-item=0] .active").removeClass("active"), 
        l = globalData.movieLeftNum) : 1 == globalData.itemNum ? globalData.activeNum == globalData.movieLeftNum ? l = globalData.gameLeftNum : globalData.activeNum == globalData.movieLeftNum + 1 && (l = globalData.gameLeftNum + 2) : 2 == globalData.itemNum && (globalData.activeNum == globalData.gameLeftNum ? l = globalData.latelyLeftNum : globalData.activeNum == globalData.gameLeftNum + 1 ? l = globalData.latelyLeftNum + 1 : globalData.activeNum == globalData.gameLeftNum + 2 && (l = globalData.latelyLeftNum + 2)), 
        $("#main [data-item=" + (globalData.itemNum + 1) + "] [data-num=" + l + "]").addClass("active").css({
            transform: o,
            border: j,
            boxShadow: i,
            zIndex: e
        })), 13 == m) {
            var p, q = localStorage.getItem("latelyArray").split(","), r = globalData.activeNum - 1;
            0 == globalData.itemNum ? (window.androidNative && "function" == typeof window.androidNative.tvUrl && window.androidNative.setDataJson("data"), 
            location.href = [ "app_set.html" ]) : 1 == globalData.itemNum ? ($.inArray(globalData.hot[r].title, q) >= 0 ? (p = $.inArray(globalData.hot[r].title, q), 
            q.splice(p, 1), globalData.lately.splice(p, 1), q.unshift(globalData.hot[r].title), 
            globalData.lately.unshift(globalData.hot[r])) : (9 == q.length && (q.splice(8, 1), 
            globalData.lately.splice(8, 1)), q.unshift(globalData.hot[r].title), globalData.lately.unshift(globalData.hot[r])), 
            localStorage.setItem("latelyArray", q), localStorage.setItem("data_lately", JSON.stringify(globalData.lately)), 
            location.href = [ "./" + globalData.hot[r].url + "&len=" + globalData.hot[r].len + "&num=1" ]) : 2 == globalData.itemNum ? ($.inArray(globalData.game[r].title, q) >= 0 ? (p = $.inArray(globalData.game[r].title, q), 
            q.splice(p, 1), globalData.lately.splice(p, 1), q.unshift(globalData.game[r].title), 
            globalData.lately.unshift(globalData.game[r])) : (9 == q.length && (q.splice(8, 1), 
            globalData.lately.splice(8, 1)), q.unshift(globalData.game[r].title), globalData.lately.unshift(globalData.game[r])), 
            localStorage.setItem("latelyArray", q), localStorage.setItem("data_lately", JSON.stringify(globalData.lately)), 
            location.href = [ "./" + globalData.game[r].url ]) : 3 == globalData.itemNum && (globalData.lately[globalData.activeNum - 1].len ? location.href = [ "./" + globalData.lately[globalData.activeNum - 1].url + "&len=" + globalData.lately[globalData.activeNum - 1].len + "&num=1" ] : location.href = [ globalData.lately[globalData.activeNum - 1].url ]), 
            k();
        }
    };
    l(), document.onkeydown = function(a) {
        var b = a || window.event || arguments.callee.caller.arguments[0];
        globalData.itemNum = parseInt($("body .active").parent().attr("data-item")), globalData.activeNum = parseInt($("#main .active").attr("data-num")), 
        globalData.movieLeftNum = parseInt($(".mod-movie-item div[style*='9.9%']").attr("data-num")), 
        globalData.gameLeftNum = parseInt($(".mod-game-item div[style*='9.9%']").attr("data-num")), 
        globalData.latelyLeftNum = parseInt($(".mod-lately-item div[style*='9.9%']").attr("data-num")), 
        b && 38 == b.keyCode && d && (d = !1, 1 != globalData.itemNum ? (o(globalData.itemNum, globalData.activeNum, 38), 
        2 == globalData.itemNum ? ($("#main .nav-movie").css({
            backgroundImage: "url(./dep/img/videodown.png)"
        }), $("#main .nav-game").css({
            backgroundImage: "url(./dep/img/gameup.png)"
        })) : 3 == globalData.itemNum && ($("#main .nav-game").css({
            backgroundImage: "url(./dep/img/gamedown.png)"
        }), $("#main .nav-lately").css({
            backgroundImage: "url(./dep/img/recentup.png)"
        })), k()) : 1 == globalData.itemNum ? ($("#main [data-item=" + globalData.itemNum + "] .active").removeClass("active"), 
        $("#main [data-item=" + globalData.itemNum + "] [data-num=" + globalData.activeNum + "]").css({
            transform: "scale(1)",
            borderWidth: "0",
            boxShadow: "0 0 0 rgba(0, 0, 0, .0)"
        }), $("#header .top-set").addClass("active").css({
            backgroundImage: "url(./dep/img/adminis_down.png)"
        }), $("#main .nav-movie").css({
            backgroundImage: "url(./dep/img/videoup.png)"
        }), k()) : k()), b && 40 == b.keyCode && d && (d = !1, 3 != globalData.itemNum && 0 != globalData.itemNum ? (o(globalData.itemNum, globalData.activeNum, 40), 
        k(), 1 == globalData.itemNum ? ($("#main .nav-movie").css({
            backgroundImage: "url(./dep/img/videoup.png)"
        }), $("#main .nav-game").css({
            backgroundImage: "url(./dep/img/gamedown.png)"
        })) : 2 == globalData.itemNum && ($("#main .nav-game").css({
            backgroundImage: "url(./dep/img/gameup.png)"
        }), $("#main .nav-lately").css({
            backgroundImage: "url(./dep/img/recentdown.png)"
        }))) : 0 == globalData.itemNum ? (o(globalData.itemNum, globalData.activeNum, 40), 
        k(), $("#main .nav-movie").css({
            backgroundImage: "url(./dep/img/videodown.png)"
        }), $("body [data-item=0] .top-set").css({
            backgroundImage: "url(./dep/img/adminis_up.png)"
        })) : k()), b && 37 == b.keyCode && d && (d = !1, o(globalData.itemNum, globalData.activeNum, 37)), 
        b && 39 == b.keyCode && d && (d = !1, o(globalData.itemNum, globalData.activeNum, 39)), 
        b && 13 == b.keyCode && d && (d = !1, o(globalData.itemNum, globalData.activeNum, 13));
    };
});