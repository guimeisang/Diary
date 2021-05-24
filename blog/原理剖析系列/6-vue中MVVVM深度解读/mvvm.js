class MVVM {
  constructor(options) {
    // 先把可用的东西挂在示例上
    this.$el = options.$el
    this.$data = options.$data
    // 如果有要编译的模版就开始编译
    if(this.$el) {
      // 数据劫持，把对象的所有属性改为get和set
      new Observer(this.$data)
      this.proxyData(this.$data) // 代理数据
      new Compile(this.$el, this) // 编译
    }
  }

  // 代理数据，因为用户可能要通过this.msg取值，而不是this.$data.msg 取值
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperties(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    })
  }
}