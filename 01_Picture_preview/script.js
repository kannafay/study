document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', function(e) {
    let target = e.target
    
    if (target.tagName === 'IMG' && target.getAttribute('data-preview') == 'true') {
      let img_url = target.getAttribute('src')
  
      // 创建元素
      let div = document.createElement('div')
      let span = document.createElement('span')
      let img = new Image()
  
      // 设置元素属性并整理结构
      img.setAttribute('src', img_url)
      img.setAttribute('data-preview', 'active')
      
      img.addEventListener('load', () => {
        span.appendChild(img)
        div.appendChild(span)
        document.body.appendChild(div)
      })
  
      img.addEventListener('error', () => {
        let p = document.createElement('p')
        p.innerText = 'Img Not Found'
        p.classList.add('error')
        span.appendChild(p)
        div.appendChild(span)
        document.body.appendChild(div)
      })
  
      setTimeout(() => {
        span.classList.add('in')
        div.classList.add('in')
      }, 50)

      //禁止滚动
      document.body.style.overflow = 'hidden'
  
    } else {

      let img = document.querySelector('div span img')
      let p = document.querySelector('div span p')
  
      const change = (span,div) => {
        // 修改样式
        span.classList.remove('in')
        div.classList.remove('in')
        span.classList.add('out')
        div.classList.add('out')

        // 删除元素
        setTimeout(() => {
          div.remove()
          // 允许滚动
          document.body.style.overflow = ''
        }, 300)
      } 
  
      if (img && (img.getAttribute('data-preview') == 'active')) {
        let span = img.parentNode;
        let div = img.parentNode.parentNode
        change(span, div)

      } else if (p && (p.classList.contains('error'))) {
        let span = p.parentNode
        let div = p.parentNode.parentNode
        change(span, div)
      }
    }
  })
})