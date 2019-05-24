
import { getData } from './data'

import Slide from './dom'

let slide = new Slide('___hupuExt')
let list = document.querySelector('.for-list')
// 创建侧边栏dom
slide.create()


let event = {
    in: function(e) {
        if(e.target.className === 'truetit') {
            let author = e.target.parentNode.parentNode.querySelector('.aulink').innerHTML
            getData({ url: e.target.href, title: e.target.innerHTML , author: author})
                .then(res => { 
                    slide.update(res).show()
                    lazyLoadImg()}
                ).catch(err =>  console.log(err))
        }
        
    },
    out: function(e) {
        e.target.className === 'truetit' ? slide.show(false) : slide
    }
}

let status = {
    'on': function() {
        slide.create()
        list.addEventListener('mouseover', event.in, false)
        list.addEventListener('mouseout', event.out, false)
    },
    'off': function() {
        list.removeEventListener('mouseover', event.in, false)
        list.removeEventListener('mouseover', event.out, false)
        slide.delete()
    }
}

// 状态初始化
chrome.storage.sync.get('switch', function(res) {
    res.switch ? status.on() : status.off()
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	// console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
	if(request.cmd == 'switch') {
        // 开关打开
        request.value === 'on' ? status.on() : status.off()
    }
	sendResponse('我收到了你的消息！');
});

// 图片懒加载
function lazyLoadImg() {
    let slideImg = document.querySelectorAll('.__basic_custom_img img')
    if(slideImg && slideImg.length > 3) {
        let io = new IntersectionObserver(entries => {
            entries.forEach(i => {
                let iSrc = i.target.getAttribute('src')
                if(iSrc === 'https://b1.hoopchina.com.cn/web/sns/bbs/images/placeholder.png') {
                    i.target.setAttribute('src', i.target.getAttribute('data-original'))
                } else io.unobserve(i.target)
            })
        }, {threshold: [0.1]})
        slideImg.forEach(i => {
            io.observe(i)
        })
    }   
}



