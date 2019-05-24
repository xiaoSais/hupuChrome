// 根据url后台打开一个网页获取图片内容
import axios from './axios'

/**
 * 
 * @param {*} param 参数类型
 * @string param.url 帖子地址
 * @string param.title 帖子标题
 */
export function getData(param) {
    return new Promise((resolve, reject) => {
        axios.get(param.url).then(res => {
            let ht = document.createElement('html')
            ht.innerHTML = res.data
            let imgList = ht.querySelectorAll('.quote-content p img')
            let divList = ht.querySelectorAll('.quote-content div img')            
            let img = [...imgList, ...divList].map(i => { return i.outerHTML })

            let quote = ht.querySelector('.quote-content')
            let contList = quote.innerText.trim().replace(/<br>/g, '')
            .replace('发自虎扑Android客户端', '').replace('发自虎扑iPhone客户端', '')
            let contString = contList

            let floorList = ht.querySelectorAll('.floor .floor_box')
            let contentList = [...floorList].map( i => {
                let comment = i.querySelector('.case tbody tr td').innerText ||  
                i.querySelector('.case tbody tr td p').innerText
                return {
                    author: i.querySelector('.author .u').innerText,
                    comment: comment.trim().replace(/<br>/g, '')
                    .replace('发自虎扑Android客户端', '').replace('发自虎扑iPhone客户端', '')
                }
            })
            // 移除自己的帖子
            contentList.shift()
            let contentString = contentList.map(i=> {
                return `
                    <div class="__basic_custom_floor">
                        <div class="__basic_custom_floor_author">
                            @${i.author}:
                        </div>
                        <div class="__basic_custom_floor_comment">“${i.comment}”</div>
                    </div>
                `
            })
            let result = `
                <img class="__basic_custom_logo_img" src="https://b3.hoopchina.com.cn/images/logo2017/v1/hp_logo_sports.png" />
                <div class="__basic_custom_title">${param.title}</div>
                <div class="__basic_custom_author">Created by ${param.author}</div>
                <div class="__basic_custom_content">${contString.trim().replace(/<br>/g, '')}</div>
                <div class="__basic_custom_img">${img.join('')}</div>
                <div class="__basic_custom_floor_header">这些回帖亮了</div>
                <div class="__basic_custom_readfloor">${contentString.join('')}</div>
                <div class="__basic_custom_end">THE END</div>
            `
            resolve([result])
        }).catch(err => reject(err))
    })
}

