function checkOpen(){}function coverColor(){var path=document.getElementById("post-cover")?.src;if(void 0!==path){var httpRequest=new XMLHttpRequest;httpRequest.open("GET",path+"?imageAve",!0),httpRequest.send(),httpRequest.onreadystatechange=function(){if(4==httpRequest.readyState&&200==httpRequest.status){var json=httpRequest.responseText,obj=eval("("+json+")"),value=obj.RGB;value="#"+value.slice(2),"light"==getContrastYIQ(value)&&(value=LightenDarkenColor(colorHex(value),-50)),document.styleSheets[0].addRule(":root","--LHL-main:"+value+"!important"),document.styleSheets[0].addRule(":root","--LHL-main-op:"+value+"23!important"),document.styleSheets[0].addRule(":root","--LHL-main-op-deep:"+value+"dd!important"),document.styleSheets[0].addRule(":root","--LHL-main-none:"+value+"00!important"),LHL.initThemeColor(),document.getElementById("coverdiv").classList.add("loaded")}}}else document.styleSheets[0].addRule(":root","--LHL-main: var(--LHL-theme)!important"),document.styleSheets[0].addRule(":root","--LHL-main-op: var(--LHL-theme-op)!important"),document.styleSheets[0].addRule(":root","--LHL-main-op-deep:var(--LHL-theme-op-deep)!important"),document.styleSheets[0].addRule(":root","--LHL-main-none: var(--LHL-theme-none)!important"),LHL.initThemeColor()}function colorHex(e){var t=e;if(/^(rgb|RGB)/.test(t)){for(var o=t.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(","),n="#",a=0;a<o.length;a++){var r=(+o[a]).toString(16);"0"===r&&(r+=r),n+=r}return 7!==n.length&&(n=t),n}if(!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t))return t;var i=t.replace(/#/,"").split("");if(6===i.length)return t;if(3===i.length){var l="#";for(a=0;a<i.length;a+=1)l+=i[a]+i[a];return l}}function colorRgb(e){var t=e.toLowerCase();if(t&&/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)){if(4===t.length){for(var o="#",n=1;n<4;n+=1)o+=t.slice(n,n+1).concat(t.slice(n,n+1));t=o}var a=[];for(n=1;n<7;n+=2)a.push(parseInt("0x"+t.slice(n,n+2)));return"rgb("+a.join(",")+")"}return t}function LightenDarkenColor(e,t){var o=!1;"#"==e[0]&&(e=e.slice(1),o=!0);var n=parseInt(e,16),a=(n>>16)+t;a>255?a=255:a<0&&(a=0);var r=(n>>8&255)+t;r>255?r=255:r<0&&(r=0);var i=(255&n)+t;return i>255?i=255:i<0&&(i=0),(o?"#":"")+("000000"+(i|r<<8|a<<16).toString(16)).slice(-6)}function getContrastYIQ(e){var t,o=colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);return t=299*o[1]+587*o[2]+114*o[3],(t/=255e3)>=.5?"light":"dark"}function navTitle(){let e=document.title;document.getElementById("page-name-text").innerHTML=e.replace(" | 刘洪亮Leo的博客","")}function showcopy(){if(void 0!==GLOBAL_CONFIG.Snackbar)pty.snackbarShow(GLOBAL_CONFIG.copy.success);else{const e=ctx.previousElementSibling;e.innerText=GLOBAL_CONFIG.copy.success,e.style.opacity=1,setTimeout((()=>{e.style.opacity=0}),700)}}checkOpen.toString=function(){this.opened=!0},window.onload=function(){let e=document.getElementsByClassName("copybtn");for(let t=0;t<e.length;t++)document.getElementsByClassName("copybtn")[t].addEventListener("click",(function(){showcopy()}));LHL.initThemeColor()};var getTimeState=()=>{var e=(new Date).getHours(),t="";return e>=0&&e<=5?t="早点儿休息哦！":e>5&&e<=10?t="早上好，又是充实的一天！":e>10&&e<=14?t="加油过好自己的生活！":e>14&&e<=18?t="没什么可以阻挡你想做的事情！":e>18&&e<=24&&(t="敬你一杯酒，愿你有诗有梦！"),t},navFn={switchDarkMode:()=>{"light"===("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")?(activateDarkMode(),saveToLocal.set("theme","dark",2),void 0!==GLOBAL_CONFIG.Snackbar&&pty.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night,!1,2e3)):(activateLightMode(),saveToLocal.set("theme","light",2),void 0!==GLOBAL_CONFIG.Snackbar&&pty.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day,!1,2e3)),"function"==typeof utterancesTheme&&utterancesTheme(),"object"==typeof FB&&window.loadFBComment(),window.DISQUS&&document.getElementById("disqus_thread").children.length&&setTimeout((()=>window.disqusReset()),200);let e="light"===document.documentElement.getAttribute("data-theme")?"#363636":"#F7F7FA";if(document.getElementById("posts-chart")){let t=postsOption;t.textStyle.color=e,t.title.textStyle.color=e,t.xAxis.axisLine.lineStyle.color=e,t.yAxis.axisLine.lineStyle.color=e,postsChart.setOption(t)}if(document.getElementById("tags-chart")){let t=tagsOption;t.textStyle.color=e,t.title.textStyle.color=e,t.xAxis.axisLine.lineStyle.color=e,t.yAxis.axisLine.lineStyle.color=e,tagsChart.setOption(t)}if(document.getElementById("categories-chart")){let t=categoriesOption;t.textStyle.color=e,t.title.textStyle.color=e,t.legend.textStyle.color=e,categoriesChart.setOption(t)}}};function RemoveRewardMask(){$(".reward-main").attr("style","display: none"),$("#quit-box").attr("style","display: none")}function AddRewardMask(){$(".reward-main").attr("style","display: flex"),$("#quit-box").attr("style","display: flex")}function travelling(){let e=Array.from(flinksAll),t=e[Math.floor(Math.random()*e.length)];if(t){var o=t.name,n=t.link;let e="点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「"+o+"」";document.styleSheets[0].addRule(":root","--LHL-snackbar-time:8000ms!important"),Snackbar.show({text:e,duration:8e3,pos:"top-center",actionText:"前往",onActionClick:function(e){$(e).css("opacity",0),window.open(n,"_blank")}})}e=null}function toRandomFlink(){let e=Array.from(flinksAll);window.open(e[Math.floor(Math.random()*e.length)].link),e=null}function removeLoading(){setTimeout((function(){preloader.endLoading()}),3e3)}function addFriendLink(){let e=document.getElementsByClassName("el-textarea__inner")[0],t=document.createEvent("HTMLEvents");t.initEvent("input",!0,!0),e.value="昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，并且支持直接访问）：\n描述：\n",e.dispatchEvent(t),LHL.scrollTo("post-comment"),e.focus(),e.setSelectionRange(-1,-1)}function getArrayItems(e,t){let o=[];for(let t in e)o.push(e[t]);let n=[];for(let e=0;e<t&&o.length>0;e++){let t=Math.floor(Math.random()*o.length);n[e]=o[t],o.splice(t,1)}return n}function initObserver(){var e=document.getElementById("post-comment"),t=document.getElementById("pagination");e&&t&&new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting?(t.classList.add("show-window"),document.querySelector(".comment-barrage").style.bottom="-200px"):(t.classList.remove("show-window"),document.querySelector(".comment-barrage").style.bottom="0px")}))})).observe(e)}function percent(){let e=document.documentElement.scrollTop||window.pageYOffset,t=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)-document.documentElement.clientHeight,o=Math.round(e/t*100),n=document.querySelector("#percent"),a=window.scrollY+document.documentElement.clientHeight,r=document.getElementById("post-tools")||document.getElementById("footer");r.offsetTop+r.offsetHeight/2<a||o>90?(document.querySelector("#nav-totop").classList.add("long"),n.innerHTML="返回顶部"):(document.querySelector("#nav-totop").classList.remove("long"),o>=0&&(n.innerHTML=o)),endresult=t-e,endresult<100?$(".needEndHide").addClass("hide"):$(".needEndHide").removeClass("hide"),window.onscroll=percent}function addKeyShotListener(){$(window).off("keydown"),$(window).off("keyup"),$(window).on("keydown",keyDownEvent),$(window).on("keyup",keyUpEvent)}function keyDownEvent(e){if(27==e.keyCode&&(LHL.hideLoading(),LHL.hideConsole(),rm.hideRightMenu()),LHL_keyboard&&e.shiftKey&&!LHL_intype){if(16==e.keyCode&&document.querySelector("#keyboard-tips").classList.add("show"),75==e.keyCode)return LHL.keyboardToggle(),!1;if(65==e.keyCode)return LHL.showConsole(),!1;if(77==e.keyCode)return LHL.musicToggle(),!1;if(82==e.keyCode)return toRandomPost(),!1;if(72==e.keyCode)return pjax.loadUrl("/"),!1;if(68==e.keyCode)return rm.switchDarkMode(),!1;if(70==e.keyCode)return pjax.loadUrl("/moments/"),!1;if(76==e.keyCode)return pjax.loadUrl("/link/"),!1;if(80==e.keyCode)return pjax.loadUrl("/about/"),!1;if(84==e.keyCode)return pjax.loadUrl("/stars/"),!1}}function keyUpEvent(e){16==e.keyCode&&document.querySelector("#keyboard-tips").classList.remove("show")}function open_all_tags(){document.querySelectorAll(".card-allinfo .card-tag-cloud").forEach((e=>{e.classList.add("all-tags")}));const e=document.getElementById("more-tags-btn");e&&e.parentNode.removeChild(e)}function listenToPageInputPress(){var e=document.getElementById("toPageText"),t=document.getElementById("toPageButton");e&&(e.addEventListener("keydown",(e=>{13===e.keyCode&&(LHL.toPage(),pjax.loadUrl(t.href))})),e.addEventListener("input",(function(){""===e.value||"0"===e.value?t.classList.remove("haveValue"):t.classList.add("haveValue");var o=document.querySelectorAll(".page-number"),n=+o[o.length-1].innerHTML;+document.getElementById("toPageText").value>n&&(e.value=n)})))}function initBlog(){window.commentBarrageInitialized=!1,coverColor(),addRightMenuClickEvent(),navTitle(),percent(),listenToPageInputPress(),LHL.topPostScroll(),LHL.sayhi(),LHL.addTag(),LHL.stopImgRightDrag(),LHL.addFriendLinksInFooter(),LHL.qrcodeCreate(),LHL.privacyRead(),LHL.onlyHome(),LHL.addNavBackgroundInit(),LHL.initIndexEssay(),LHL.changeTimeFormate(),LHL.darkModeStatus(),LHL.categoriesBarActive(),LHL.initThemeColor(),LHL.tagPageActive(),LHL.removeBodyPaceClass(),LHL.changeCanonical(),LHLGPT.aiExplanation(),AIEngine(),addAIToggleListener(),LHL.getHitokoto(),LHL.topGroup(),LHL.hideLoading(),initObserver(),initializeCommentBarrage()}document.addEventListener("touchstart",(e=>{RemoveRewardMask()}),!1),$(document).unbind("keydown").bind("keydown",(function(e){if((e.ctrlKey||e.metaKey)&&67==e.keyCode&&""!=selectTextNow)return pty.snackbarShow("复制成功，复制和转载请标注本文地址"),rm.rightmenuCopyText(selectTextNow),!1})),document.addEventListener("scroll",pty.throttle((function(){LHL.initThemeColor()}),200)),navigator.serviceWorker.getRegistrations().then((function(e){for(let t of e)t.unregister()})),window.onkeydown=function(e){123===e.keyCode&&pty.snackbarShow("开发者模式已打开，请遵循GPL协议",!1,3e3)},"true"==localStorage.getItem("keyboardToggle")?(document.querySelector("#consoleKeyboard").classList.add("on"),LHL_keyboard=!0):(document.querySelector("#consoleKeyboard").classList.remove("on"),LHL_keyboard=!1),addKeyShotListener(),$("input").focus((function(){LHL_intype=!0})),$("textarea").focus((function(){LHL_intype=!0})),$("input").focusout((function(){LHL_intype=!1})),$("textarea").focusout((function(){LHL_intype=!1})),window.onfocus=function(){document.querySelector("#keyboard-tips").classList.remove("show")},document.addEventListener("pjax:click",(function(){console.clear(),Pace.restart(),LHL.showLoading(),$(window).prop("keydown",null).off("keydown")}));