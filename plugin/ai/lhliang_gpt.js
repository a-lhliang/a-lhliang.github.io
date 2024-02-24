let LHLGPTIsRunning = !1
  , LHL_aiPostExplanation = ""
  , GPTModel = "LHLGPT"
  , aiTalkMode = !1;
var GPT = {
    aiExplanation: async function() {
        const e = document.querySelector(".ai-explanation");
        if (!e)
            return;
        "" === LHL_aiPostExplanation && (LHL_aiPostExplanation = e.innerText);
        const n = GPT.synonymReplace(LHL_aiPostExplanation);
        GPT.aiShowAnimation(Promise.resolve(n))
    },
    loadLHLgpt: async function() {
        if (null === lhlgpt) {
            const e = await fetch("/json/lhlgpt.json");
            lhlgpt = await e.json()
        }
    },
    getTitleAndContent: function() {
        const e = document.title
          , n = document.getElementById("article-container")
          , o = n.getElementsByTagName("p")
          , t = n.querySelectorAll("h1, h2, h3, h4, h5");
        let i = "";
        for (let e of t)
            i += e.innerText + " ";
        for (let e of o) {
            i += e.innerText.replace(/https?:\/\/[^\s]+/g, "")
        }
        const a = (e + " " + i).slice(0, 1e3);
        return console.log("lhliang:" + a),
        a
    },
    fetchTianliGPT: async function(e, n) {
        const o = `https://summary.tianli0.top/?content=${encodeURIComponent(e)}&key=${encodeURIComponent(n)}`;
        try {
            const e = new AbortController
              , n = await fetch(o, {
                signal: e.signal
            });
            if (n.ok) {
                return (await n.json()).summary
            }
            throw Error("请求失败")
        } catch (e) {
            return "AbortError" === e.name ? console.error("请求超时") : console.error("请求失败：", e),
            "获取文章摘要超时。当你出现这个问题时，可能是因为文章过长导致的AI运算量过大， 您可以稍等一下然后重新切换到TianliGPT模式，或者尝试使用LHLGPT模式。"
        }
    },
    tianliGPTGenerate: async function() {
        const e = GPT.fetchTianliGPT(GPT.getTitleAndContent(), "7ChCvmgZcpvIeUzBrJ2S");
        GPT.aiShowAnimation(e)
    },
    toggleGPTModel: function() {
        if (LHLGPTIsRunning)
            return;
        const e = document.getElementById("ai-tag");
        "TianliGPT" === GPTModel ? (GPTModel = "LHLGPT",
        GPT.aiShowAnimation(Promise.resolve(LHL_aiPostExplanation)),
        e.innerText = "LHLGPT") : (GPTModel = "TianliGPT",
        GPT.tianliGPTGenerate(),
        e.innerText = "TianliGPT")
    },
    aiShowAnimation: function(e) {
        const n = document.querySelector(".ai-explanation");
        if (!n)
            return;
        if (LHLGPTIsRunning)
            return;
        GPT.cleanSuggestions(),
        LHLGPTIsRunning = !0;
        n.style.display = "block",
        n.innerHTML = '摘要生成中...<span class="blinking-cursor"></span>';
        let o = !1
          , t = 0
          , i = !0;
        function a(e) {
            const n = e.getBoundingClientRect();
            return n.top >= 0 && n.left >= 0 && n.bottom <= (window.innerHeight || document.documentElement.clientHeight) && n.right <= (window.innerWidth || document.documentElement.clientWidth)
        }
        e.then((e=>{
            let s = performance.now();
            function l() {
                if (t < e.length && o) {
                    const o = performance.now()
                      , i = o - s
                      , a = e.slice(t, t + 1);
                    i >= (/[，。！、？,.!?]/.test(a) ? 150 : 25) && (n.innerText = e.slice(0, t + 1),
                    s = o,
                    t++,
                    t < e.length ? n.innerHTML = e.slice(0, t) + '<span class="blinking-cursor"></span>' : (n.innerHTML = e,
                    n.style.display = "block",
                    GPT.createSuggestions(),
                    LHLGPTIsRunning = !1)),
                    requestAnimationFrame(l)
                }
            }
            function c() {
                a(n) ? o || (o = !0,
                i ? setTimeout((()=>{
                    l(),
                    i = !1
                }
                ), 1e3) : l()) : o = !1
            }
            function c() {
                a(n) ? o || (o = !0,
                i ? setTimeout((()=>{
                    l(),
                    i = !1
                }
                ), 1e3) : l()) : o = !1
            }
            window.addEventListener("scroll", c),
            window.addEventListener("resize", c),
            window.addEventListener("scroll", c),
            window.addEventListener("resize", c);
            const r = setInterval(c, 500);
            LHLGPTIsRunning || clearInterval(r),
            c()
        }
        )).catch((e=>{
            console.error("获取信息失败:", e),
            n.innerHTML = "获取信息失败",
            n.style.display = "block",
            LHLGPTIsRunning = !1
        }
        ))
    },
    synonymReplace: async function(e) {
        await GPT.loadLHLgpt();
        const n = Object.keys(lhlgpt);
        for (let o = 0; o < n.length; o++) {
            const t = n[o]
              , i = lhlgpt[t]
              , a = RegExp(t, "gi");
            e = e.replace(a, (()=>{
                const e = Math.floor(Math.random() * i.length);
                return i[e]
            }
            ))
        }
        return e
    },
    createSuggestionItemWithAction: function(e, n) {
        const o = document.querySelector(".ai-suggestions");
        if (!o)
            return void console.error("无法找到具有class为ai-suggestions的元素");
        const t = document.createElement("div");
        t.classList.add("ai-suggestions-item"),
        t.textContent = e,
        t.addEventListener("click", (()=>{
            n()
        }
        )),
        o.appendChild(t)
    },
    cleanSuggestions: function() {
        const e = document.querySelector(".ai-suggestions");
        e ? e.innerHTML = "" : console.error("无法找到具有class为ai-suggestions的元素")
    },
    createSuggestions: function() {
        aiTalkMode && (GPT.cleanSuggestions(),
        "LHLGPT" === GPTModel ? (GPT.createSuggestionItemWithAction("博主介绍？", (()=>{
            GPT.aiShowAnimation(Promise.resolve("博主 是一位技术顾问，他的主要职业是IT售前工程师、技术架构师，同时也是一名前端爱好者。如果您想了解更多关于博主的信息，可以访问博客的关于本站介绍。"))
        }
        )),
        GPT.createSuggestionItemWithAction("这篇文章讲了什么？", (()=>{
            GPT.aiShowAnimation(Promise.resolve(LHL_aiPostExplanation))
        }
        )),
        GPT.createSuggestionItemWithAction("带我去看看其他文章", (()=>toRandomPost()))) : "TianliGPT" === GPTModel && (console.log("TianliGPT生成的文章摘要成功")))
    }
};
function LHLGPTTalkMode() {
    document.querySelectorAll(".ai-suggestions") && GPT.aiShowAnimation(Promise.resolve("我是博主的文章摘要生成助理，是一个基于GPT-4与Correction的混合语言模型。我在这里只负责摘要的预生成和显示，你无法与我直接沟通，但我可以回答一些预设的问题。"))
};
function tianliGPTTalkMode() {
    document.querySelectorAll(".ai-suggestions") && GPT.aiShowAnimation(Promise.resolve("你好，我是Tianli开发的摘要生成助理TianliGPT，是一个基于GPT-3.5的生成式AI。我在这里只负责摘要的实时生成和显示，你无法与我直接沟通。"))
};
