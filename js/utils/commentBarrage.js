var commentBarrageConfig = {
    // Display the maximum number of bullet screens at the same time
    maxBarrage: 1,
    // Bullet screen display interval (ms)
    barrageTime: 5000,
    // Twikoo deployment address Tencent Cloud is the environment ID
    twikooUrl: "a-lhliang-blog-3g2i9p2r418bc6d3",
    // See above for token acquisition
    accessToken: "e3fde5ee4bc1bb8c5021357dfbea59b6",
    pageUrl: window.location.pathname,
    barrageTimer: [],
    barrageList: [],
    barrageIndex: 0,
    dom: document.querySelector('.comment-barrage'),
}

var commentInterval = null;
var hoverOnCommentBarrage = false;

$(".comment-barrage").hover(function () {
    hoverOnCommentBarrage = true;
}, function () {
    hoverOnCommentBarrage = false;
});

function initCommentBarrage() {
    let data = JSON.stringify({
        "event": "COMMENT_GET",
        "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
        "url": commentBarrageConfig.pageUrl
    });
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data);
            commentBarrageConfig.dom.innerHTML = '';
        }
    });
    xhr.open("POST", commentBarrageConfig.twikooUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);


    clearInterval(commentInterval);
    commentInterval = null;

    commentInterval = setInterval(() => {
        if (commentBarrageConfig.barrageList.length && !hoverOnCommentBarrage) {
            popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
            commentBarrageConfig.barrageIndex += 1;
            commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
        }
        if ((commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length)) && !hoverOnCommentBarrage) {
            removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
        }
    }, commentBarrageConfig.barrageTime)
}

function commentLinkFilter(data) {
    data.sort((a, b) => {
        return a.created - b.created;
    })
    let newData = [];
    data.forEach(item => {
        newData.push(...getCommentReplies(item));
    });
    return newData;
}

function getCommentReplies(item) {
    if (item.replies) {
        let replies = [item];
        item.replies.forEach(item => {
            replies.push(...getCommentReplies(item));
        })
        return replies;
    } else {
        return [];
    }
}

function popCommentBarrage(data) {
    let barrage = document.createElement('div');
    let width = commentBarrageConfig.dom.clientWidth;
    let height = commentBarrageConfig.dom.clientHeight;
    barrage.className = 'comment-barrage-item'
    barrage.innerHTML = `
		<div class="barrageHead">
          <a class="barrageTitle" href="javascript:LHL.scrollTo('post-comment')">热评</a>
		  <div class="barrageNick">${data.nick}</div>
		  <img class="barrageAvatar" src="https://cravatar.cn/avatar/${data.mailMd5}" alt="${data.nick}"/>
		  <a class="comment-barrage-close" href="javascript:LHL.switchCommentBarrage()"><i class="lhlfont icon-close" style="font-size: 16px;"></i></a>
		</div>
		<a class="barrageContent" href="#${data.id}">${data.comment}</a>
	`
    commentBarrageConfig.barrageTimer.push(barrage);
    commentBarrageConfig.dom.append(barrage);
}

function removeCommentBarrage(barrage) {
    barrage.className = 'comment-barrage-item out';
    setTimeout(() => {
        commentBarrageConfig.dom.removeChild(barrage);
    }, 1000)
}


// Auto hide
document.addEventListener('scroll', pty.throttle(function () {
    // Scroll bar height+window height=bottom height of visible area
    let visibleBottom = window.scrollY + document.documentElement.clientHeight;
    // Height of top of visible area
    let visibleTop = window.scrollY;
    // Get the flipping button container
    let pagination = document.querySelector('.comment-barrage');
    // Get the location monitoring container, and use the comment area here
    let eventlistner = document.getElementById('post-tools');
    if (eventlistner && pagination) {
        let centerY = eventlistner.offsetTop + (eventlistner.offsetHeight / 2);
        if (document.body.clientWidth > 768) {
            if (centerY > visibleBottom) {
                pagination.style.bottom = '0';
            } else {
                pagination.style.bottom = '-200px';
            }
        }
    }
}, 200))

initCommentBarrage();

if (localStorage.getItem('commentBarrageSwitch') !== 'false') {
    $(".comment-barrage").show();
    $(".menu-commentBarrage-text").text("关闭热评");
    document.querySelector("#consoleCommentBarrage").classList.add("on");
} else {
    $(".comment-barrage").hide();
    $(".menu-commentBarrage-text").text("显示热评");
    document.querySelector("#consoleCommentBarrage").classList.remove("on");
}


document.addEventListener('pjax:send', function () {
    clearInterval(commentInterval);
})