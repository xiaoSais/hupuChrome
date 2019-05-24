
/**
 * @module slide
 * @description 侧边栏的操作方法
 */
class Slide {
    constructor(idName) {
        this.idName = idName
        this.slide =  document.querySelector(`#${this.idName}`) || undefined
    }

    // 创建侧边栏dom
    create() {
        if(!this.slide) {
            let slide = document.createElement('div')
            slide.setAttribute('id', this.idName)
            slide.setAttribute('class', '__basic_custom')
            let body = document.querySelector('body')
            body.appendChild(slide)
            this.slide = slide
        } return this
    }

    // 数据更新的方法
    update(data) {
        // 存在数据是否重复的判断
        if(this.slide &&  Array.isArray(data)) {
            if(!(this.slide.innerHTML ===  data.join(''))) {
                this.slide.innerHTML =  data.join('')
                this.slide.scrollTo(0,0)
            }                 
        } return this
    }
    
    // 控制slide显示隐藏的方法
    show(type = true) {
        if(this.slide) {
            type ? this.slide.classList.add('__basic_custom_show', '__basic_custom_fixed')
            : this.slide.classList.remove('__basic_custom_show')
        } return this
    }

    // 删除slide的方法
    delete() {
        if(this.slide) {
            let body = document.querySelector('body')
            body.removeChild(this.slide)
            this.slide = undefined
        } return this
    }
}

module.exports = Slide



