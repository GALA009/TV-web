/*! This is TV盒子  - 2016-10-13 */$("#videoBlur").width($(window).width()), $("#videoBlur").height($(window).height()), 
$(document).ready(function() {
    var a = !0;
    window.globalData = {};
    var b = document.getElementById("videoBlur"), c = function() {
        a = !0;
    }, d = function() {
        for (var a = {}, b = location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("=");
            if (-1 != e) {
                var f = c[d].substring(0, e), g = c[d].substring(e + 1);
                g = decodeURIComponent(g), a[f] = g;
            }
        }
        return a;
    }, e = function() {
        globalData.url = d(), 1 == globalData.url.id ? globalData.movieUrl = "baixiangnameduo" : 2 == globalData.url.id ? globalData.movieUrl = "lvyoudaren" : 3 == globalData.url.id ? globalData.movieUrl = "zhongcaidaren" : 4 == globalData.url.id ? globalData.movieUrl = "pastadaren" : 5 == globalData.url.id ? globalData.movieUrl = "yundongdaren" : 6 == globalData.url.id && (globalData.movieUrl = "xiaobaiduanpian"), 
        $("#videoBlur").attr("src", "http://meiriq-static.b0.upaiyun.com/static/TV/movie/" + globalData.movieUrl + "/" + globalData.url.num + ".mp4");
        var a = localStorage.getItem("playTime");
        document.getElementById("videoBlur").currentTime = a, $("body").css({
            background: "#000"
        });
    };
    setInterval(function() {
        var a, b = document.getElementById("videoBlur"), c = b.currentTime;
        setTimeout(function() {
            a = b.currentTime, c == a ? b.paused ? b.ended && parseInt(globalData.url.num) < parseInt(globalData.url.len) && (localStorage.removeItem("playTime"), 
            location.href = [ "./movie_full.html?id=" + globalData.url.id + "&len=" + globalData.url.len + "&num=" + (parseInt(globalData.url.num) + 1) ]) : $(".loading-img").css("visibility", "visible") : $(".loading-img").css("visibility", "hidden");
        }, 200);
    }, 1e3), e(), document.onkeydown = function(d) {
        var e = d || window.event || arguments.callee.caller.arguments[0];
        console.log(e.keyCode), e && 37 == e.keyCode && a ? b.currentTime -= 5 : e && 39 == e.keyCode && a ? (b.currentTime += 5, 
        c()) : e && 13 == e.keyCode && a ? (b.paused ? b.play() : b.pause(), c()) : e && 8 == e.keyCode && a && (localStorage.setItem("playTime", b.currentTime - 2), 
        location.href = [ "../view/movie_full.html?id=" + globalData.url.id + "&len=" + globalData.url.len + "&num=" + globalData.url.num ], 
        c());
    };
});