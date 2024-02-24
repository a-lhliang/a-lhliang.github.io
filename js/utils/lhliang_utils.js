let LHL_musicPlaying = !1
  , LHL_keyboard = !1
  , LHL_intype = !1
//   , LHL_showFPS = !1
  , lhlgpt = null
  , LHL_cookiesTime = null
  , lastSayHello = "";
var LHL = {
    // 检查显示模式
    darkModeStatus: function() {
        "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? $(".menu-darkmode-text").text("深色模式") : $(".menu-darkmode-text").text("浅色模式")
    },
    
    // 首页即刻短文
    initIndexEssay: function() {
        if (document.querySelector("#bber-talk"))
            new Swiper(".swiper-container",{
                direction: "vertical",
                loop: !0,
                autoplay: {
                    delay: 3e3,
                    pauseOnMouseEnter: !0
                }
            })
    },

    // 判断首页显示
    onlyHome: function() {
        var e = window.location.pathname;
        "/" == (e = decodeURIComponent(e)) ? $(".only-home").attr("style", "display: flex") : $(".only-home").attr("style", "display: none")
    },

    // 判断文章页面
    is_Post: function() {
        return window.location.href.indexOf("/p/") >= 0
    },

    // 页面标题显示
    addNavBackgroundInit: function() {
        var e = 0
          , t = 0;
        document.body && (e = document.body.scrollTop),
        document.documentElement && (t = document.documentElement.scrollTop),
        0 != (e - t > 0 ? e : t) && (document.getElementById("page-header").classList.add("nav-fixed"),
        document.getElementById("page-header").classList.add("nav-visible"))
    },

    // 是否选中标签
    tagPageActive: function() {
        var e = window.location.pathname;
        if (/\/tags\/.*?\//.test(e = decodeURIComponent(e))) {
            var t = e.split("/")[2];
            document.querySelector("#tag-page-tags") && ($("a").removeClass("select"),
            document.getElementById(t).classList.add("select"))
        }
    },

    // 是否选中分类Bar
    categoriesBarActive: function() {
        document.querySelector("#category-bar") && $(".category-bar-item").removeClass("select");
        var e = window.location.pathname;
        if ("/" == (e = decodeURIComponent(e)))
            document.querySelector("#category-bar") && document.getElementById("category-bar-home").classList.add("select");
        else {
            if (/\/categories\/.*?\//.test(e)) {
                var t = e.split("/")[2];
                document.querySelector("#category-bar") && document.getElementById(t).classList.add("select")
            }
        }
    },

    // 添加底部友链
    addFriendLinksInFooter: function () {
        let flinksFooter = Array.from(flinksAll); 
        let randomFriendLinks = [];
        while (randomFriendLinks.length < 2 && flinksFooter.length > 0) {
            let index = Math.floor(Math.random() * flinksFooter.length);
            randomFriendLinks.push(flinksFooter.splice(index, 1)[0]);
        }
        let htmlText = '';
        for (let i = 0; i < randomFriendLinks.length; ++i) {
            let item = randomFriendLinks[i]
            htmlText += `<a class='footer-item' href='${item.link}' target="_blank" rel="noopener nofollow">${item.name}</a>`;
        }
        htmlText += `<a class='footer-item' href='/link'>更多</a>`
        document.getElementById("friend-links-in-footer").innerHTML = htmlText;
        flinksFooter = null;
    },

    // 防止右键单击图片
    stopImgRightDrag: function() {
        $("img").on("dragstart", (function() {
            return !1
        }
        ))
    },

    // 置顶文章水平滚动
    topPostScroll: function() {
        if (document.getElementById("recent-post-top")) {
            let e = document.getElementById("recent-post-top");
            e.addEventListener("mousewheel", (function(t) {
                e.scrollLeft += -t.wheelDelta / 2,
                document.body.clientWidth < 1300 && t.preventDefault()
            }
            ), supportsPassive ? { passive: true } : false)
        }
    },

    // 作者卡片问好
    sayhi: function() {
        document.querySelector("#author-info__sayhi") && (document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是")
    },

    // 添加标签
    addTag: function() {
        document.querySelector(".lhl-tag-new") && $(".lhl-tag-new").append('<sup class="lhl-tag lhl-tag-new-view">N</sup>'),
        document.querySelector(".lhl-tag-hot") && $(".lhl-tag-hot").append('<sup class="lhl-tag lhl-tag-hot-view">H</sup>')
    },

    // 创建QR Code
    qrcodeCreate: function () {
        if (document.getElementById('qrcode')) {
            document.getElementById("qrcode").innerHTML = "";
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: window.location.href,
                width: 250,
                height: 250,
                colorDark: "#000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    },

    // 即刻短文瀑布流
    reflashEssayWaterFall: function() {
        document.querySelector("#waterfall") && setTimeout((function() {
            waterfall("#waterfall"),
            document.getElementById("waterfall").classList.add("show")
        }), 500)
    },

    // 时间格式切换
    changeTimeFormate: function() {
        if (document.querySelector(".bber-info-time")) {
            for (var e = document.getElementsByTagName("time"), t = 0; t < e.length; t++) {
                var o, n = e[t].getAttribute("datetime"), a = new Date(n), i = (new Date).getTime() - a.getTime(), l = Math.floor(i / 864e5);
                o = 0 === l ? "今天" : 1 === l ? "昨天" : 2 === l ? "前天" : l <= 7 ? l + "天前" : a.getFullYear() !== (new Date).getFullYear() ? a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate() : a.getMonth() + 1 + "/" + a.getDate(),
                e[t].textContent = o
            }
        }
    },

    // 下载图片操作
    downloadImage: function(e, t) {
        rm.hideRightMenu(),
        0 == rm.downloadimging ? (rm.downloadimging = !0,
        pty.snackbarShow("正在下载中，请稍后", !1, 1e4),
        setTimeout((function() {
            let o = new Image;
            o.setAttribute("crossOrigin", "anonymous"),
            o.onload = function() {
                let e = document.createElement("canvas");
                e.width = o.width,
                e.height = o.height,
                e.getContext("2d").drawImage(o, 0, 0, o.width, o.height);
                let n = e.toDataURL("image/png")
                  , a = document.createElement("a")
                  , i = new MouseEvent("click");
                a.download = t || "photo",
                a.href = n,
                a.dispatchEvent(i)
            }
            ,
            o.src = e,
            pty.snackbarShow("图片已添加盲水印，请遵守版权协议"),
            rm.downloadimging = !1
        }
        ), "10000")) : pty.snackbarShow("有正在进行中的下载，请稍后再试")
    },

    // 热评开关切换
    switchCommentBarrage: function() {
        document.querySelector(".comment-barrage") && ($(".comment-barrage").is(":visible") ? ($(".comment-barrage").hide(),
        $(".menu-commentBarrage-text").text("显示热评"),
        document.querySelector("#consoleCommentBarrage").classList.remove("on"),
        localStorage.setItem("commentBarrageSwitch", "false")) : $(".comment-barrage").is(":hidden") && ($(".comment-barrage").show(),
        $(".menu-commentBarrage-text").text("关闭热评"),
        document.querySelector("#consoleCommentBarrage").classList.add("on"),
        localStorage.removeItem("commentBarrageSwitch"))),
        rm.hideRightMenu()
    },

    // 隐藏隐私政策
    hideCookie: function() {
        LHL_cookiesTime = setTimeout((()=>{
            document.getElementById("cookies-window").classList.add("cw-hide"),
            setTimeout((()=>{
                $("#cookies-window").hide()
            }), 1e3)
        }), 5e3)
    },

    // 阅读隐私政策
    privacyRead: function() {
        window.location.href.indexOf("privacy") >= 0 && localStorage.setItem("read-privacy-policy", "true"),
        "true" !== localStorage.getItem("read-privacy-policy") && ($("#cookies-window").show(),
        LHL.hideCookie())
    },

    // 隐藏今天推荐
    hideTodayCard: function() {
        document.getElementById("todayCard") && document.getElementById("todayCard").classList.add("hide")
    },

    // 切换主题颜色
    changeThemeColor: function(e) {
        null !== document.querySelector('meta[name="theme-color"]') && (document.querySelector('meta[name="theme-color"]').setAttribute("content", e),
        document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", e))
    },
 
    // 适配主题颜色
    initThemeColor: function() {
        const e = window.scrollY || document.documentElement.scrollTop;
        if (LHL.is_Post()) {
            if (e > 0) {
                let e = getComputedStyle(document.documentElement).getPropertyValue("--LHL-card-bg");
                LHL.changeThemeColor(e)
            } else if (0 === e) {
                let e = getComputedStyle(document.documentElement).getPropertyValue("--LHL-main");
                LHL.changeThemeColor(e)
            }
        } else if (e > 0) {
            let e = getComputedStyle(document.documentElement).getPropertyValue("--LHL-card-bg");
            LHL.changeThemeColor(e)
        } else if (0 === e) {
            let e = getComputedStyle(document.documentElement).getPropertyValue("--LHL-background");
            LHL.changeThemeColor(e)
        }
    },

    // 跳转到指定位置
    jumpTo: function(e) {
        $(document).ready((function() {
            $("html,body").animate({
                scrollTop: $(e).eq(i).offset().top
            }, 500)
        }
        ))
    },

    // 切换永久链接
    changeCanonical: function() {
        let e = window.location.href;
        document.querySelector('link[rel="canonical"]').setAttribute("href", e)
    },

    // 显示加载动画
    showLoading: function () {
        document.querySelector("#loading-box").classList.remove("loaded");
        let e = getComputedStyle(document.documentElement).getPropertyValue('--LHL-card-bg');
        LHL.changeThemeColor(e);
    },

    // 隐藏加载动画
    hideLoading: function () {
        document.querySelector("#loading-box").classList.add("loaded");
        GPT.aiExplanation();
    },

    // 切换音乐播放状态
    musicToggle: function() {
        LHL_musicPlaying ? (document.querySelector("#nav-music").classList.remove("playing"),
        document.getElementById("menu-music-toggle").innerHTML = '<i class="fa-solid lhlfont icon-play-fill"></i><span>播放音乐</span>',
        document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停",
        document.querySelector("#consoleMusic").classList.remove("on"),
        LHL_musicPlaying = !1) : (document.querySelector("#nav-music").classList.add("playing"),
        document.getElementById("menu-music-toggle").innerHTML = '<i class="fa-solid lhlfont icon-pause-fill"></i><span>暂停音乐</span>',
        document.querySelector("#consoleMusic").classList.add("on"),
        LHL_musicPlaying = !0),
        document.querySelector("meting-js").aplayer.toggle(),
        rm.hideRightMenu()
    },
    
    // 向即刻文本添加扩展
    addMediumInEssay: function () {
        if (document.querySelector('#waterfall')) {
            mediumZoom(document.querySelectorAll('[data-zoomable]'))
        }
    },

    // 音乐上一首
    musicSkipBack: function () {
        document.querySelector('meting-js').aplayer.skipBack();
        rm.hideRightMenu();
    },

    // 音乐下一首
    musicSkipForward: function () {
        document.querySelector('meting-js').aplayer.skipForward();
        rm.hideRightMenu();
    },

    // 查看音乐名字
    musicGetName: function() {
        for (var e = $(".aplayer-title"), t = [], o = e.length - 1; o >= 0; o--)
            t[o] = e[o].innerText;
        return t[0]
    },

    // 显示控制中心
    showConsole: function () {
        document.querySelector("#console").classList.add("show");
        LHL.initConsoleState();
    },

    // 隐藏控制中心
    hideConsole: function () {
        document.querySelector("#console").classList.remove("show");
    },

    // 快捷按键功能切换
    keyboardToggle: function() {
        LHL_keyboard ? (LHL_keyboard = !1,
        document.querySelector("#consoleKeyboard").classList.remove("on"),
        localStorage.setItem("keyboardToggle", "false")) : (LHL_keyboard = !0,
        document.querySelector("#consoleKeyboard").classList.add("on"),
        localStorage.setItem("keyboardToggle", "true"))
    },

    // AI摘要文字打印
    scrollTo: function(e) {
        const t = document.getElementById(e);
        if (t) {
            const e = t.getBoundingClientRect().top + window.pageYOffset - 80
              , o = window.pageYOffset
              , n = e - o;
            let a = null;
            window.requestAnimationFrame((function e(t) {
                a || (a = t);
                const l = t - a
                  , c = Math.min(l / 0, 1)
                  , i = (r = c) < .5 ? 2 * r * r : (4 - 2 * r) * r - 1;
                var r;
                window.scrollTo(0, o + n * i),
                l < 600 && window.requestAnimationFrame(e)
            }
            ))
        }
    },

    // 隐藏边栏
    hideAsideBtn: ()=>{
        const e = document.documentElement.classList;
        e.contains("hide-aside") ? saveToLocal.set("aside-status", "show", 2) : saveToLocal.set("aside-status", "hide", 2),
        e.toggle("hide-aside"),
        e.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on")
    }
    ,

    // 初始化控制台图标
    initConsoleState: function() {
        document.documentElement.classList.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on")
    },

    // 删除冗余的 pace classes
    removeBodyPaceClass: function () {
        $('body').removeClass()
        $('body').addClass('pace-done')
    },

    // 网络推文
    getHitokoto: function () {
        if (document.getElementById('hitokoto')) {
            fetch('https://v1.hitokoto.cn/?c=k')
            .then(function (res) {
            return res.json()
            })
            .then(function (res) {
            document.getElementById('hitokoto').innerHTML = res.hitokoto + '<br/> -「<b>' + res.from + '</b>」'
            })
        }
    },

    // today卡片动画
    topGroup: function () {
        $(".topGroup").hover((function() {}
        ), (function() {
            hoverOnCommentBarrage = !1,
            document.getElementById("todayCard").classList.remove("hide"),
            document.getElementById("todayCard").style.zIndex = 1
        }
        ))
    },

    // 运行AI
    AIEngine: function () {
        const e = document.querySelector(".ai-tag");
        e && e.addEventListener("click", (()=>{
            LHLGPTIsRunning || (aiTalkMode = !0,
            "LHLGPT" === GPTModel ? LHLGPTTalkMode() : tianliGPTTalkMode())
        }
        ))
    },

    // 添加AI监听
    addAIToggleListener: function () {
        const e = document.querySelector("#ai-Toggle");
        e && e.addEventListener("click", (()=>{
            GPT.toggleGPTModel()
        }
        ))
    },
    // 显示FPS
    // FPSToggle: function () {
    //     if (LHL_showFPS) {
    //         LHL_showFPS = !1;
    //         document.querySelector("#fps-group").classList.remove("show");
    //         document.querySelector("#consoleFPS").classList.remove("on");
    //         localStorage.setItem('showFPS', 'false');
    //     } else {
    //         LHL_showFPS = !0;
    //         document.querySelector("#fps-group").classList.add("show");
    //         document.querySelector("#consoleFPS").classList.add("on");
    //         localStorage.setItem('showFPS', 'true');
    //     }
    // },

    //跳转到指定页面
    toPage: function() {
        console.log("执行跳转");
        var e = document.querySelectorAll(".page-number")
          , t = parseInt(e[e.length - 1].innerHTML)
          , o = document.getElementById("toPageText")
          , n = parseInt(o.value);
        if (!isNaN(n) && n > 0 && "0" !== ("" + n)[0] && n <= t) {
            var a = "/page/" + n + "/";
            document.getElementById("toPageButton").href = a
        }
    },

    //作者卡片tips更改
    changeSayHelloText: function() {
        const e = ["🤖️ 数码科技爱好者", "🔍 分享与热心帮助", "🏠 智能家居小能手", "🔨 设计开发一条龙", "🤝 专修交互与设计", "🏃 脚踏实地行动派", "🧱 团队小组发动机", "💢 壮汉人狠话不多"]
          , t = document.getElementById("author-info__sayhi");
        let o = e[Math.floor(Math.random() * e.length)];
        for (; o === lastSayHello; )
            o = e[Math.floor(Math.random() * e.length)];
        t.textContent = o,
        lastSayHello = o
    },

    //滚动首页分类条
    scrollCategoryBarToRight: function() {
        var e = document.getElementById("category-bar-items")
          , t = document.getElementById("category-bar-next")
          , o = e.clientWidth;
        e && (e.scrollLeft + e.clientWidth >= e.scrollWidth ? (e.scroll({
            left: 0,
            behavior: "smooth"
        }),
        t.innerHTML = '<i class="lhlfont icon-right-arrow-double"></i>') : e.scrollBy({
            left: o,
            behavior: "smooth"
        }))
    },

    //匿名评论
    addRandomCommentInfo: function () {
        // 从形容词数组中随机取一个值
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

        // 从蔬菜水果动物名字数组中随机取一个值
        const randomName = vegetablesAndFruits[Math.floor(Math.random() * vegetablesAndFruits.length)];

        // 将两个值组合成一个字符串
        const name = `${randomAdjective}${randomName}`;

        function dr_js_autofill_commentinfos() {
            let lauthor = ["#author", "input[name='comname']", "#inpName", "input[name='author']", "#ds-dialog-name", "#name", "input[name='nick']", "#comment_author"],
                lmail = ["#mail", "#email", "input[name='commail']", "#inpEmail", "input[name='email']", "#ds-dialog-email", "input[name='mail']", "#comment_email"],
                lurl = ["#url", "input[name='comurl']", "#inpHomePage", "#ds-dialog-url", "input[name='url']", "input[name='website']", "#website", "input[name='link']", "#comment_url"];
            for (let i = 0; i < lauthor.length; i++) {
                let author = document.querySelector(lauthor[i]);
                if (author != null) {
                    author.value = name;
                    author.dispatchEvent(new Event('input'));
                    author.dispatchEvent(new Event('change'));
                    break;
                }
            }
            for (let j = 0; j < lmail.length; j++) {
                let mail = document.querySelector(lmail[j]);
                if (mail != null) {
                    mail.value = 'visitor@lhliang.com';
                    mail.dispatchEvent(new Event('input'));
                    mail.dispatchEvent(new Event('change'));
                    break;
                }
            }
            return !1;
        }

        dr_js_autofill_commentinfos();
        let input = document.getElementsByClassName('el-textarea__inner')[0];
        input.focus();
        input.setSelectionRange(-1, -1);
    }
};

// 通过选项对象中的 getter 进行测试，以查看是否访问了被动属性
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

const adjectives = ["美丽的", "英俊的", "聪明的", "勇敢的", "可爱的", "慷慨的", "善良的", "可靠的", "开朗的", "成熟的", "稳重的", "真诚的", "幽默的", "豁达的", "有趣的", "活泼的", "优雅的", "敏捷的", "温柔的", "温暖的", "敬业的", "细心的", "耐心的", "深沉的", "朴素的", "含蓄的", "率直的", "开放的", "务实的", "坚强的", "自信的", "谦虚的", "文静的", "深刻的", "纯真的", "朝气蓬勃的", "慎重的", "大方的", "顽强的", "迷人的", "机智的", "善解人意的", "富有想象力的", "有魅力的", "独立的", "好奇的", "干净的", "宽容的", "尊重他人的", "体贴的", "守信的", "有耐性的", "有责任心的", "有担当的", "有远见的", "有智慧的", "有眼光的", "有冒险精神的", "有爱心的", "有同情心的", "喜欢思考的", "喜欢学习的", "具有批判性思维的", "善于表达的", "善于沟通的", "善于合作的", "善于领导的", "有激情的", "有幽默感的", "有思想的", "有个性的", "有正义感的", "有责任感的", "有创造力的", "有想象力的", "有艺术细胞的", "有团队精神的", "有协调能力的", "有决策能力的", "有组织能力的", "有学习能力的", "有执行能力的", "有分析能力的", "有逻辑思维的", "有创新能力的", "有专业素养的", "有商业头脑的"]
  , vegetablesAndFruits = ["萝卜", "白菜", "芹菜", "生菜", "青椒", "辣椒", "茄子", "豆角", "黄瓜", "西红柿", "洋葱", "大蒜", "土豆", "南瓜", "豆腐", "韭菜", "花菜", "西兰花", "蘑菇", "金针菇", "苹果", "香蕉", "橙子", "柠檬", "猕猴桃", "草莓", "葡萄", "桃子", "杏子", "李子", "石榴", "西瓜", "哈密瓜", "蜜瓜", "樱桃", "蓝莓", "柿子", "橄榄", "柚子", "火龙果"];

$(document).ready((function() {
    initBlog()
}
)),
document.addEventListener("pjax:send", (function() {
    clearTimeout(LHL_cookiesTime)
}
)),
document.addEventListener("pjax:complete", (function() {
    LHLGPTIsRunning = !1,
    LHL_aiPostExplanation = "",
    aiTalkMode = !1,
    GPTModel = "LHLGPT",
    initBlog()
}
)),
document.addEventListener("pjax:click", (function() {
    console.log("pjax:click")
}
));