
let switc = document.querySelector('.block')
let circle = document.querySelector('.circle')
let text = document.querySelector('.text')


let active = {
    switch1: {
        close() {
            switc.classList.remove('block_active')
            circle.classList.remove('circle_active')
            text.innerHTML = 'SWITCH OFF'
            chrome.storage.sync.set({switch: false })
            sendMessageToContentScript({ cmd: 'switch', value: 'off'})
        },
        open() {
            switc.classList.add('block_active')
            circle.classList.add('circle_active')
            text.innerHTML = 'SWITCH ON'
            chrome.storage.sync.set({switch: true })
            sendMessageToContentScript({ cmd: 'switch', value: 'on'}, function(response) {
                console.log('来自switch的回复: ' + response)
            })
        }
    }
}

// 状态初始化
chrome.storage.sync.get('switch', function(res) {
    res.switch ? active.switch1.open() : active.switch1.close()
})

switc.addEventListener('click', function() {
    if(switc.classList.contains('block_active')) {
        active.switch1.close()
    } else {
        active.switch1.open()
    }
}, false)


function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //alert(JSON.stringify(tabs.url))
        chrome.tabs.getSelected(null, function (tab) {
            // 如果是目标页面就发送消息
            if(tab.url.includes('bbs.hupu.com')) {
                chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                    if(callback) callback(response);
                });
            } else return 
        });
	});
}