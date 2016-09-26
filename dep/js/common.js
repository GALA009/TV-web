/*! This is TV盒子  - 2016-07-24 */function startTime() {
    var a = new Date(), b = a.getHours(), c = checkTime(a.getMinutes());
    $("#header .top-time span").text(b + ":" + c), setTimeout(startTime, 1e3);
}

function checkTime(a) {
    return a = 10 > a ? "0" + a : a;
}

window.globalData = {};

var getJsonLength = function(a) {
    var b = 0;
    for (var c in a) b++;
    return b;
};

$(document).ready(function() {
    var a;
    if (null === localStorage.getItem("collectArray")) {
        var b = [], c = JSON.parse(localStorage.getItem("data_collect"));
        for (a in c) b[a] = c[a].title;
        localStorage.setItem("collectArray", b);
    }
    if (null === localStorage.getItem("latelyArray")) {
        var d = [], e = JSON.parse(localStorage.getItem("data_lately"));
        for (a in e) d[a] = e[a].title;
        localStorage.setItem("latelyArray", d);
    }
    startTime();
});