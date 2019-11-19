var body = document.getElementsByTagName("body")[0];
var numer = body.getBoundingClientRect();
var getw = Math.floor(numer.width * 0.88);
var getH = Math.floor(numer.height * 0.52);
$(function () {
    var box_ul = $(".box-con ul");
    creatLi(data.letv, 0)

    function creatLi(newData, start) {
        var html = '';
        for (var i = start; i < newData.length; i++) {
            html += '<li class=""><a href="javascript:;"></a>'
            html += '<img src="' + newData[i].img + '">';
            html += '<p class="b_tit"><span class="liPOpacity"></span>';
            html += '<span class="tit">';
            html += '<span>' + newData[i].title + '</span>';
            html += '</span></p></li>';
        }
        $(".list")[0].innerHTML = html;
    }
    var prev = $(".prev")[0];
    var next = $(".next")[0];
    var box_li = $(".box-con li");
    for (var i = 5; i < box_li.length; i++) {
        console.log(i);
        box_li.eq(i).stop().animate({
            width: Math.floor(getw * 0.18),
            height: Math.floor(getH * 0.57),
            top: Math.floor(getH * 0.22),
            left: Math.floor(getw * 0.82)
        }, 500).css("z-index", 10);
    }
    box_li.eq(0).stop().animate({
        width: Math.floor(getw * 0.18),
        height: Math.floor(getH * 0.57),
        top: Math.floor(getH * 0.22),
        left: 0
    }, 500).css("z-index", 20);
    box_li.eq(1).stop().animate({
        width: Math.floor(getw * 0.24),
        height: Math.floor(getH * 0.72),
        left: Math.floor(getw * 0.12),
        top: Math.floor(getH * 0.14)
    }, 500).css("z-index", 30);
    box_li.eq(2).stop().animate({
        width: Math.floor(getw * 0.42),
        height: Math.floor(getH * 1),
        left: Math.floor(getw * 0.29),
        top: 0
    }, 500).css("z-index", 50);
    box_li.eq(3).stop().animate({
        width: Math.floor(getw * 0.24),
        height: Math.floor(getH * 0.72),
        left: Math.floor(getw * 0.66),
        top: Math.floor(getH * 0.14)
    }, 500).css("z-index", 30).next();
    box_li.eq(4).stop().animate({
        width: Math.floor(getw * 0.18),
        height: Math.floor(getH * 0.57),
        top: Math.floor(getH * 0.22),
        left: Math.floor(getw * 0.82)
    }, 500).css("z-index", 20);
    next.addEventListener('click', nextFun, false);
    prev.addEventListener('click', prevFun, false);
    timer = setInterval(nextFun, 10000);
    $(".box-con")[0].onmouseover = function () {
        clearInterval(timer);
    };
    $(".box-con")[0].onmouseout = function () {
        timer = setInterval(nextFun, 10000);
    };

    function nextFun() {
        box_li = $(".box-con li");
        box_li.eq(0).stop().animate({
            left: 0
        }, 500, function () {
            box_li.eq(0).css("left", Math.floor(getw * 0.82)).css("z-index", 10).appendTo(box_ul);
        });
        box_li.eq(1).stop().animate({
            width: Math.floor(getw * 0.18),
            height: Math.floor(getH * 0.57),
            top: Math.floor(getH * 0.22),
            left: 0
        }, 500).css("z-index", 30);
        box_li.eq(2).stop().animate({
            width: Math.floor(getw * 0.24),
            height: Math.floor(getH * 0.72),
            left: Math.floor(getw * 0.12),
            top: Math.floor(getH * 0.14)
        }, 500).css("z-index", 30);
        box_li.eq(3).stop().animate({
            width: Math.floor(getw * 0.42),
            height: Math.floor(getH * 1),
            left: Math.floor(getw * 0.29),
            top: 0
        }, 500).css("z-index", 50);
        box_li.eq(4).stop().animate({
            width: Math.floor(getw * 0.24),
            height: Math.floor(getH * 0.72),
            left: Math.floor(getw * 0.66),
            top: Math.floor(getH * 0.14)
        }, 500).css("z-index", 30);
        box_li.eq(5).stop().animate({
            width: Math.floor(getw * 0.18),
            height: Math.floor(getH * 0.57),
            top: Math.floor(getH * 0.22),
            left: Math.floor(getw * 0.82)
        }).css("z-index", 20);
    };

    function prevFun() {
        box_li = $(".box-con li");
        $(".box-con li:last").prependTo(box_ul).css("left", 0).stop().animate({
            left: 0
        }, 500);
        box_li.eq(4).stop().animate({
            width: Math.floor(getw * 0.18),
            height: Math.floor(getH * 0.57),
            top: Math.floor(getH * 0.22),
            left: Math.floor(getw * 0.82)
        }, 500).css("z-index", 10);
        box_li.eq(3).stop().animate({
            width: Math.floor(getw * 0.18),
            height: Math.floor(getH * 0.57),
            top: Math.floor(getH * 0.22),
            left: Math.floor(getw * 0.82)
        }, 500).css("z-index", 20);
        box_li.eq(2).stop().animate({
            width: Math.floor(getw * 0.24),
            height: Math.floor(getH * 0.72),
            left: Math.floor(getw * 0.66),
            top: Math.floor(getH * 0.14)
        }, 500).css("z-index", 30);
        box_li.eq(1).stop().animate({
            width: Math.floor(getw * 0.42),
            height: Math.floor(getH * 1),
            left: Math.floor(getw * 0.29),
            top: 0
        }, 500).css("z-index", 50);
        box_li.eq(0).stop().animate({
            width: Math.floor(getw * 0.24),
            height: Math.floor(getH * 0.72),
            left: Math.floor(getw * 0.12),
            top: Math.floor(getH * 0.14)
        }, 500).css("z-index", 30);
    };
    var listA = $(".list li a");
    console.log(listA);
    for (var i = 0; i < listA.length; i++) {
        listAclick(i);
    }

    function listAclick(i) {
        listA[i].onclick = function () {
            console.log(i);
            letvIfraem(data.letv[i].ul);
        }
    }

    function letvIfraem(ul) {
        var letv3D = document.createElement("div");
        letv3D.className = "letvIframe";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(letv3D);
        letv3D.innerHTML = '<span class="letvclose cursor poA">�˳�</span><iframe src="' + ul + '" width="100%" height="100%"></iframe>';
        var letvclose = document.querySelector(".letvIframe .letvclose");
        letvclose.onclick = function () {
            body.removeChild(letv3D);
        }
    }
    isTouchDevice();

    function touchSatrtFunc(evt) {
        try {
            var touch = evt.touches[0];
            var x = Number(touch.pageX);
            var y = Number(touch.pageY);
            startX = x;
            startY = y;
            touchchange = 0;
            clearInterval(timer);
        } catch (e) {
            alert('touchSatrtFunc��' + e.message);
        }
    }
    var touchchange = 0;

    function touchMoveFunc(evt) {
        touchchange = 0;
        try {
            var touch = evt.touches[0];
            var x = Number(touch.pageX);
            var y = Number(touch.pageY);
            console.log(x - startX);
            if (x - startX > 70) {
                touchchange = 1;
                console.log("��you");
            } else if (x - startX < -70) {
                console.log("��zuo");
                touchchange = 2;
            }
        } catch (e) {}
    }

    function touchEndFunc(evt) {
        timer = setInterval(nextFun, 10000);
        if (touchchange === 2) {
            nextFun();
        } else if (touchchange === 1) {
            prevFun();
        }
        try {} catch (e) {
            alert('touchEndFunc��' + e.message);
        }
    }

    function bindEvent(box) {
        box.addEventListener('touchstart', touchSatrtFunc, false);
        box.addEventListener('touchmove', touchMoveFunc, false);
        box.addEventListener('touchend', touchEndFunc, false);
    }

    function isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            var box = document.getElementsByClassName("list")[0];
            bindEvent(box);
        } catch (e) {}
    }
});