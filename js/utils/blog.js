function checkOpen() {}
function coverColor() {
    var path = document.getElementById("post-cover")?.src;
    if (void 0 !== path) {
        var httpRequest = new XMLHttpRequest;
        httpRequest.open("GET", path + "?imageAve", !0),
        httpRequest.send(),
        httpRequest.onreadystatechange = function() {
            if (4 == httpRequest.readyState && 200 == httpRequest.status) {
                var json = httpRequest.responseText
                  , obj = eval("(" + json + ")")
                  , value = obj.RGB;
                value = "#" + value.slice(2),
                "light" == getContrastYIQ(value) && (value = LightenDarkenColor(colorHex(value), -50)),
                document.styleSheets[0].addRule(":root", "--LHL-main:" + value + "!important"),
                document.styleSheets[0].addRule(":root", "--LHL-main-op:" + value + "23!important"),
                document.styleSheets[0].addRule(":root", "--LHL-main-op-deep:" + value + "dd!important"),
                document.styleSheets[0].addRule(":root", "--LHL-main-none:" + value + "00!important"),
                LHL.initThemeColor(),
                document.getElementById("coverdiv").classList.add("loaded")
            }
        }
    } else
        document.styleSheets[0].addRule(":root", "--LHL-main: var(--LHL-theme)!important"),
        document.styleSheets[0].addRule(":root", "--LHL-main-op: var(--LHL-theme-op)!important"),
        document.styleSheets[0].addRule(":root", "--LHL-main-op-deep:var(--LHL-theme-op-deep)!important"),
        document.styleSheets[0].addRule(":root", "--LHL-main-none: var(--LHL-theme-none)!important"),
        LHL.initThemeColor()
}
function colorHex(e) {
    var t = e;
    if (/^(rgb|RGB)/.test(t)) {
        for (var o = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), n = "#", a = 0; a < o.length; a++) {
            var i = (+o[a]).toString(16);
            "0" === i && (i += i),
            n += i
        }
        return 7 !== n.length && (n = t),
        n
    }
    if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t))
        return t;
    var r = t.replace(/#/, "").split("");
    if (6 === r.length)
        return t;
    if (3 === r.length) {
        var d = "#";
        for (a = 0; a < r.length; a += 1)
            d += r[a] + r[a];
        return d
    }
}
function colorRgb(e) {
    var t = e.toLowerCase();
    if (t && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) {
        if (4 === t.length) {
            for (var o = "#", n = 1; n < 4; n += 1)
                o += t.slice(n, n + 1).concat(t.slice(n, n + 1));
            t = o
        }
        var a = [];
        for (n = 1; n < 7; n += 2)
            a.push(parseInt("0x" + t.slice(n, n + 2)));
        return "rgb(" + a.join(",") + ")"
    }
    return t
}
function LightenDarkenColor(e, t) {
    var o = !1;
    "#" == e[0] && (e = e.slice(1),
    o = !0);
    var n = parseInt(e, 16)
      , a = (n >> 16) + t;
    a > 255 ? a = 255 : a < 0 && (a = 0);
    var i = (n >> 8 & 255) + t;
    i > 255 ? i = 255 : i < 0 && (i = 0);
    var r = (255 & n) + t;
    return r > 255 ? r = 255 : r < 0 && (r = 0),
    (o ? "#" : "") + ("000000" + (r | i << 8 | a << 16).toString(16)).slice(-6)
}
function getContrastYIQ(e) {
    var t, o = colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return t = 299 * o[1] + 587 * o[2] + 114 * o[3],
    (t /= 255e3) >= .5 ? "light" : "dark"
}
function navTitle() {
    let titleValue = document.title;
    document.getElementById("page-name-text").innerHTML = titleValue.replace(' | 刘洪亮Leo的博客', '');
}
function showcopy() {
    if (GLOBAL_CONFIG.Snackbar !== undefined) {
        pty.snackbarShow(GLOBAL_CONFIG.copy.success)
    } else {
        const prevEle = ctx.previousElementSibling
        prevEle.innerText = GLOBAL_CONFIG.copy.success
        prevEle.style.opacity = 1
        setTimeout(() => {
            prevEle.style.opacity = 0
        }, 700)
    }
}
checkOpen.toString = function() {
    this.opened = !0
},
window.onload = function () {
    let copybtnlist = document.getElementsByClassName("copybtn")
    for (let i = 0; i < copybtnlist.length; i++) {
        document.getElementsByClassName("copybtn")[i].addEventListener("click", function () {
            showcopy();
        });
    }
    LHL.initThemeColor();
};
var getTimeState = ()=>{
    var e = (new Date).getHours()
      , t = "";
    return e >= 0 && e <= 5 ? t = "晚安" : e > 5 && e <= 10 ? t = "早上好" : e > 10 && e <= 14 ? t = "中午好" : e > 14 && e <= 18 ? t = "下午好" : e > 18 && e <= 24 && (t = "晚上好"),
    t
};
var navFn = {
    switchDarkMode: () => { // Switch Between Light And Dark Mode
        const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
        if (nowMode === 'light') {
            activateDarkMode()
            saveToLocal.set('theme', 'dark', 2)
            GLOBAL_CONFIG.Snackbar !== undefined && pty.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night, false, 2000)
        } else {
            activateLightMode()
            saveToLocal.set('theme', 'light', 2)
            GLOBAL_CONFIG.Snackbar !== undefined && pty.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day, false, 2000)
        }
        // handle some cases
        typeof utterancesTheme === 'function' && utterancesTheme();
        typeof FB === 'object' && window.loadFBComment();
        window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)

        // Statistical chart
        let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#363636' : '#F7F7FA'
        if (document.getElementById('posts-chart')) {
            let postsOptionNew = postsOption
            postsOptionNew.textStyle.color = color
            postsOptionNew.title.textStyle.color = color
            postsOptionNew.xAxis.axisLine.lineStyle.color = color
            postsOptionNew.yAxis.axisLine.lineStyle.color = color
            postsChart.setOption(postsOptionNew)
        }
        if (document.getElementById('tags-chart')) {
            let tagsOptionNew = tagsOption
            tagsOptionNew.textStyle.color = color
            tagsOptionNew.title.textStyle.color = color
            tagsOptionNew.xAxis.axisLine.lineStyle.color = color
            tagsOptionNew.yAxis.axisLine.lineStyle.color = color
            tagsChart.setOption(tagsOptionNew)
        }
        if (document.getElementById('categories-chart')) {
            let categoriesOptionNew = categoriesOption
            categoriesOptionNew.textStyle.color = color
            categoriesOptionNew.title.textStyle.color = color
            categoriesOptionNew.legend.textStyle.color = color
            categoriesChart.setOption(categoriesOptionNew)
        }
    }
}
function RemoveRewardMask() {
    $('.reward-main').attr('style', 'display: none'),
    $('#quit-box').attr('style', 'display: none')
}
function AddRewardMask() {
    $('.reward-main').attr('style', 'display: flex'),
    $("#quit-box").attr("style", "display: flex")
}
function travelling() {
    let flinksRandom = Array.from(flinksAll);
    let fetchUrl = flinksRandom[Math.floor(Math.random() * flinksRandom.length)]
    if(fetchUrl) {
        var name = fetchUrl.name;
        var link = fetchUrl.link;
        let msg = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」";
        document.styleSheets[0].addRule(':root', '--LHL-snackbar-time:' + 8000 + 'ms!important');
        Snackbar.show({
            text: msg,
            duration: 8000,
            pos: 'top-center',
            actionText: '前往',
            onActionClick: function (element) {
                $(element).css('opacity', 0);
                window.open(link, '_blank');
            }
        });
    }
    flinksRandom = null;
}
function toRandomFlink() {
    let flinksTo = Array.from(flinksAll);
    window.open(flinksTo[Math.floor(Math.random() * flinksTo.length)].link);
    flinksTo = null;
}
function removeLoading() {
    setTimeout(function () {
        preloader.endLoading();
    }, 3000)
}
function addFriendLink() {
    let input = document.getElementsByClassName('el-textarea__inner')[0];
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    input.value = '昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，并且支持直接访问）：\n描述：\n';
    input.dispatchEvent(evt);
    LHL.scrollTo("post-comment");
    input.focus();
    input.setSelectionRange(-1, -1);
}
function getArrayItems(arr, num) {
    // Create a new array and copy the passed in array for operation, instead of directly operating the passed in array;
    let temp_array = [];
    for (let index in arr) {
        temp_array.push(arr[index]);
    }
    // The retrieved numerical items are saved in this array
    let return_array = [];
    for (let i = 0; i < num; i++) {
        // Judge if there are elements in the array that can be retrieved to prevent the subscript from exceeding the bounds
        if (temp_array.length > 0) {
            // Generate a random index in the array
            let arrIndex = Math.floor(Math.random() * temp_array.length);
            // Copy the corresponding array element value of this random index
            return_array[i] = temp_array[arrIndex];
            // Then delete the array element of this index. At this time, temp_ Array becomes a new array
            temp_array.splice(arrIndex, 1);
        } else {
            // After the data items in the array are retrieved, exit the loop. For example, the array originally only has 10 items, but 20 items are required to be retrieved
            break;
        }
    }
    return return_array;
}
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // Roll off height
        b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // Height of the whole page
        result = Math.round(a / b * 100), // Calculate percentage
        btn = document.querySelector("#percent"); // Get Button
    // Scroll bar height+window height=bottom height of visible area
    let visibleBottom = window.scrollY + document.documentElement.clientHeight;
    // Get the location monitoring container, and use the comment area here
    let eventlistner = document.getElementById('post-tools') || document.getElementById('footer');
    let centerY = eventlistner.offsetTop + (eventlistner.offsetHeight / 2);
    if ((centerY < visibleBottom) || (result > 90)) {
        document.querySelector("#nav-totop").classList.add("long");
        btn.innerHTML = "返回顶部";
    } else {
        document.querySelector("#nav-totop").classList.remove("long");
        if (result >= 0) {
            btn.innerHTML = result;
        }
    }
    // Hide aplayer and pop-up window
    endresult = b - a
    if (endresult < 100) {
        $(".needEndHide").addClass("hide")
    } else {
        $(".needEndHide").removeClass("hide")
    }
    window.onscroll = percent;
}

//检查是否开启FPS
// if (localStorage.getItem('showFPS') === 'true') {
//     LHL_showFPS = true;
//     document.querySelector("#fps-group").classList.add("show");
//     document.querySelector("#consoleFPS").classList.add("on");
// } else {
//     LHL_showFPS = false;
//     document.querySelector("#fps-group").classList.remove("show");
//     document.querySelector("#consoleFPS").classList.remove("on");
// }

// fps
// var showFPS = (function () {
//     let requestAnimationFrame =
//         window.requestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.oRequestAnimationFrame ||
//         window.msRequestAnimationFrame ||
//         function (callback) {
//             window.setTimeout(callback, 1000 / 60);
//         };
//     let e, pe, pid, fps, last, offset, step, appendFps;

//     fps = 0;
//     last = Date.now();
//     step = function () {
//         offset = Date.now() - last;
//         fps += 1;
//         if (offset >= 1000) {
//             last += offset;
//             appendFps(fps);
//             fps = 0;
//         }
//         requestAnimationFrame(step);
//     };
//     appendFps = function (fps) {
//         $('#fps').html(fps);
//     };
//     step();
// })();
function addKeyShotListener() {
    $(window).off("keydown"),
    $(window).off("keyup"),
    $(window).on("keydown", keyDownEvent),
    $(window).on("keyup", keyUpEvent)
}
function keyDownEvent(e) {
    if (27 == e.keyCode && (LHL.hideLoading(),
    LHL.hideConsole(),
    rm.hideRightMenu()),
    LHL_keyboard && e.shiftKey && !LHL_intype) {
        if (16 == e.keyCode && document.querySelector("#keyboard-tips").classList.add("show"),
        75 == e.keyCode)
            return LHL.keyboardToggle(),
            !1;
        if (65 == e.keyCode)
            return LHL.showConsole(),
            !1;
        if (77 == e.keyCode)
            return LHL.musicToggle(),
            !1;
        if (82 == e.keyCode)
            return toRandomPost(),
            !1;
        if (72 == e.keyCode)
            return pjax.loadUrl("/"),
            !1;
        if (68 == e.keyCode)
            return rm.switchDarkMode(),
            !1;
        if (70 == e.keyCode)
            return pjax.loadUrl("/moments/"),
            !1;
        if (76 == e.keyCode)
            return pjax.loadUrl("/link/"),
            !1;
        if (80 == e.keyCode)
            return pjax.loadUrl("/about/"),
            !1;
        if (84 == e.keyCode)
            return pjax.loadUrl("/stars/"),
            !1
    }
}
function keyUpEvent(e) {
    16 == e.keyCode && document.querySelector("#keyboard-tips").classList.remove("show")
}
function listenToPageInputPress() {
    var e = document.getElementById("toPageText")
      , t = document.getElementById("toPageButton");
    e && (e.addEventListener("keydown", (e=>{
        13 === e.keyCode && (LHL.toPage(),
        pjax.loadUrl(t.href))
    }
    )),
    e.addEventListener("input", (function() {
        "" === e.value || "0" === e.value ? t.classList.remove("haveValue") : t.classList.add("haveValue");
        var o = document.querySelectorAll(".page-number")
          , n = +o[o.length - 1].innerHTML;
        +document.getElementById("toPageText").value > n && (e.value = n)
    }
    )))
}

function initBlog() {
    coverColor(),
    addRightMenuClickEvent(),
    navTitle(),
    percent(),
    listenToPageInputPress(),
    LHL.topPostScroll(),
    LHL.sayhi(),
    LHL.addTag(),
    LHL.stopImgRightDrag(),
    LHL.addFriendLinksInFooter(),
    LHL.qrcodeCreate(),
    LHL.privacyRead(),
    LHL.onlyHome(),
    LHL.addNavBackgroundInit(),
    LHL.initIndexEssay(),
    LHL.changeTimeFormate(),
    LHL.reflashEssayWaterFall(),
    LHL.darkModeStatus(),
    LHL.categoriesBarActive(),
    LHL.initThemeColor(),
    LHL.tagPageActive(),
    LHL.removeBodyPaceClass(),
    LHL.changeCanonical(),
    GPT.aiExplanation(),
    LHL.AIEngine(),
    LHL.addAIToggleListener(),
    LHL.getHitokoto(),
    LHL.topGroup(),
    LHL.hideLoading()
}

document.addEventListener("touchstart", (e=>{
    RemoveRewardMask()
}
), !1),
$(document).unbind("keydown").bind("keydown", (function(e) {
    if ((e.ctrlKey || e.metaKey) && 67 == e.keyCode && "" != selectTextNow)
        return pty.snackbarShow("复制成功，复制和转载请标注本文地址"),
        rm.rightmenuCopyText(selectTextNow),
        !1
}
)),
document.addEventListener("scroll", pty.throttle((function() {
    LHL.initThemeColor()
}), 200)),
navigator.serviceWorker.getRegistrations().then((function(e) {
    for (let t of e)
        t.unregister()
}
)),
window.onkeydown = function(e) {
    123 === e.keyCode && pty.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3)
},
window.addEventListener("resize", (function() {
    document.querySelector("#waterfall") && LHL.reflashEssayWaterFall()
}
)),
document.addEventListener("scroll", pty.throttle((function() {
    var e = window.scrollY + document.documentElement.clientHeight
      , t = (window,
    document.getElementById("pagination"))
      , o = document.getElementById("post-tools");
    o && t && (document.body.clientWidth > 1300 && (o.offsetTop + o.offsetHeight / 2 < e ? t.classList.add("show-window") : t.classList.remove("show-window")))
}
), 200)),
"true" == localStorage.getItem("keyboardToggle") ? (document.querySelector("#consoleKeyboard").classList.add("on"),
LHL_keyboard = !0) : (document.querySelector("#consoleKeyboard").classList.remove("on"),
LHL_keyboard = !1),
addKeyShotListener(),
$("input").focus((function() {
    LHL_intype = !0
}
)),
$("textarea").focus((function() {
    LHL_intype = !0
}
)),
$("input").focusout((function() {
    LHL_intype = !1
}
)),
$("textarea").focusout((function() {
    LHL_intype = !1
}
)),

// Focus on the current window
window.onfocus = function () {
    document.querySelector("#keyboard-tips").classList.remove("show");
};

// Injection function
document.addEventListener('pjax:click', function () {
    console.clear();
    Pace.restart();
    LHL.showLoading();
    $(window).prop("keydown", null).off("keydown");
});