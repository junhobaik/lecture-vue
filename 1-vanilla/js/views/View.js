const tag = '[View]'

export default { 
  // ES6 module 패턴으로 아래 init on... 객체를 export
  init(el) {
    if (!el) throw el
    this.el = el
    // 받은 element를 자신의 프로퍼티로 갖게 된다.
    return this
  },


  on(event, handler) {
    this.el.addEventListener(event, handler)
    // 이벤트와 헨들러를 연결지어준다
    return this
  },
  emit(event, data) {
    const evt = new CustomEvent(event, { detail: data })
    this.el.dispatchEvent(evt)
    return this
  },


  hide() {
    this.el.style.display = 'none'
    return this
  },

  show() {
    this.el.style.display = ''
    return this
  }
}
