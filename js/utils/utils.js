const pty = {
    debounce: function (func, wait, immediate) {
        let timeout
        return function () {
            const context = this
            const args = arguments
            const later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },

    throttle: function(e, t, n) {
        let o, i, s, r = 0;
        n || (n = {});
        const a = function() {
            r = !1 === n.leading ? 0 : (new Date).getTime(),
            o = null,
            e.apply(i, s),
            o || (i = s = null)
        };
        return function() {
            const l = (new Date).getTime();
            r || !1 !== n.leading || (r = l);
            const d = t - (l - r);
            i = this,
            s = arguments,
            d <= 0 || d > t ? (o && (clearTimeout(o),
            o = null),
            r = l,
            e.apply(i, s),
            o || (i = s = null)) : o || !1 === n.trailing || (o = setTimeout(a, d))
        }
    },

    sidebarPaddingR: () => {
        const innerWidth = window.innerWidth
        const clientWidth = document.body.clientWidth
        const paddingRight = innerWidth - clientWidth
        if (innerWidth !== clientWidth) {
            document.body.style.paddingRight = paddingRight + 'px'
        }
    },

    snackbarShow: (text, showAction = false, duration = 2000) => {
        const {position, bgLight, bgDark} = GLOBAL_CONFIG.Snackbar
        const bg = document.documentElement.getAttribute('data-theme') === 'light' ? bgLight : bgDark
        Snackbar.show({
            text: text,
            backgroundColor: bg,
            showAction: showAction,
            duration: duration,
            pos: position,
            customClass: 'snackbar-css'
        })
    },
    
    diffDate: (d, more = false) => {
        const dateNow = new Date()
        const datePost = new Date(d)
        const dateDiff = dateNow.getTime() - datePost.getTime()
        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24
        const month = day * 30
        const { date_suffix } = GLOBAL_CONFIG
    
        if (!more) return parseInt(dateDiff / day)
    
        const monthCount = dateDiff / month
        const dayCount = dateDiff / day
        const hourCount = dateDiff / hour
        const minuteCount = dateDiff / minute
    
        if (monthCount > 12) return datePost.toISOString().slice(0, 10)
        if (monthCount >= 1) return `${parseInt(monthCount)} ${date_suffix.month}`
        if (dayCount >= 1) return `${parseInt(dayCount)} ${date_suffix.day}`
        if (hourCount >= 1) return `${parseInt(hourCount)} ${date_suffix.hour}`
        if (minuteCount >= 1) return `${parseInt(minuteCount)} ${date_suffix.min}`
        return date_suffix.just
    },

    loadComment: (dom, callback) => {
        if ('IntersectionObserver' in window) {
            const observerItem = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    callback()
                    observerItem.disconnect()
                }
            }, {threshold: [0]})
            observerItem.observe(dom)
        } else {
            callback()
        }
    },

    scrollToDest: (pos, time = 500) => {
        const currentPos = window.pageYOffset
        if (currentPos > pos) pos = pos - 70

        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: pos,
                behavior: 'smooth'
            })
            return
        }

        let start = null
        pos = +pos
        window.requestAnimationFrame(function step(currentTime) {
            start = !start ? currentTime : start
            const progress = currentTime - start
            if (currentPos < pos) {
                window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos)
            } else {
                window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time))
            }
            if (progress < time) {
                window.requestAnimationFrame(step)
            } else {
                window.scrollTo(0, pos)
            }
        })
    },

    animateIn: (ele, text) => {
        ele.style.display = 'block'
        ele.style.animation = text
    },

    animateOut: (ele, text) => {
        ele.addEventListener('animationend', function f() {
            ele.style.display = ''
            ele.style.animation = ''
            ele.removeEventListener('animationend', f)
        })
        ele.style.animation = text
    },

    getParents: (elem, selector) => {
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem
        }
        return null
    },

    siblings: (ele, selector) => {
        return [...ele.parentNode.children].filter((child) => {
            if (selector) {
                return child !== ele && child.matches(selector)
            }
            return child !== ele
        })
    },

    /**
     * @param {*} selector
     * @param {*} eleType the type of create element
     * @param {*} options object key: value
     */
    wrap: (selector, eleType, options) => {
        const creatEle = document.createElement(eleType)
        for (const [key, value] of Object.entries(options)) {
            creatEle.setAttribute(key, value)
        }
        selector.parentNode.insertBefore(creatEle, selector)
        creatEle.appendChild(selector)
    },

    unwrap: el => {
        const elParentNode = el.parentNode
        if (elParentNode !== document.body) {
            elParentNode.parentNode.insertBefore(el, elParentNode)
            elParentNode.parentNode.removeChild(elParentNode)
        }
    },
    isJqueryLoad: e=>{
        "undefined" == typeof jQuery ? getScript(GLOBAL_CONFIG.source.jQuery).then(e) : e()
    },
    isHidden: ele => ele.offsetHeight === 0 && ele.offsetWidth === 0,

    getEleTop: ele => {
        let actualTop = ele.offsetTop
        let current = ele.offsetParent

        while (current !== null) {
            actualTop += current.offsetTop
            current = current.offsetParent
        }

        return actualTop
    },

    loadLightbox: ele => {
        const service = GLOBAL_CONFIG.lightbox

        if (service === 'mediumZoom') {
            const zoom = mediumZoom(ele)
            zoom.on('open', e => {
                const photoBg = document.documentElement.getAttribute('data-theme') === 'dark' ? '#121212' : '#fff'
                zoom.update({
                    background: photoBg
                })
            })
        }

        if (service === 'fancybox') {
            ele.forEach(i => {
                if (i.parentNode.tagName !== 'A') {
                    const dataSrc = i.dataset.lazySrc || i.src
                    const dataCaption = i.title || i.alt || ''
                    pty.wrap(i, 'a', {
                        'class': 'fancybox',
                        href: dataSrc,
                        'data-fancybox': 'gallery',
                        'data-caption': dataCaption,
                        'data-thumb': dataSrc
                    })
                }
            })

            if (!window.fancyboxRun) {
                Fancybox.bind('[data-fancybox]', {
                    Hash: false,
                    Thumbs: {
                        autoStart: false
                    }
                })
                window.fancyboxRun = true
            }
        }
    },

    initJustifiedGallery: function (selector) {
        selector.forEach(function (i) {
            if (!pty.isHidden(i)) {
                fjGallery(i, {
                    itemSelector: '.fj-gallery-item',
                    rowHeight: 220,
                    gutter: 4,
                    onJustify: function () {
                        this.$container.style.opacity = '1'
                    }
                })
            }
        })
    },

    updateAnchor: (anchor) => {
        if (anchor !== window.location.hash) {
            if (!anchor) anchor = location.pathname
            const title = GLOBAL_CONFIG_SITE.title
            window.history.replaceState({
                url: location.href,
                title: title
            }, title, anchor)
        }
    }
}
