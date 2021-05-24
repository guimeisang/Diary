class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    if(this.el) {
      // 1. 先用真实的dom移入到内存，放到 fragment
      let fragment = this.node2Fragment(this.el)
      // 2. 编译--提取想要的元素节点和文本节点 v-model {{}}
      this.compile(fragment)
      // 3. 将编译好的element放回页面
      this.el.appendChild(fragment)
    }
  }

  isElementNode(node) {
    return node.nodeType === 1
  }

  isDirective(name) {
    return name.includes('v-')
  }

  // 将el元素内容全部放入内存
  node2Fragment(el) {
    let fragment = doucemnt.createDocumentFragment()
    let firstChild
    while(firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }

  // 编译
  compile(fragment) {
    // childNodes 拿不到嵌套子节点，需要使用递归
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node => {
      // 元素节点
      if(this.isElementNode(node)) {
        this.compileElement(node)
        this.compile(node) // 需要深入检查，使用递归
      }else {
        // 文本节点
        this.compileText(node)
      }
    })
  }

  // 编译元素 v-mode, v-text等
  compileElement(node) {
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      // 判断属性名字是否包含v-
      let attrName = attr.name
      if(this.isDirective(attrName)) {
        let expr = attr.value 
        // expr 是指令的值
        // node this.vm.$data expr
        // 取到v- 后面的名称，如 v-model的model, v-text的text等等
        // let type = attrName.slice(2)
        let [, type] = attrName.split('-')
        CompileUtil[type](node, this.vm, expr)
      }
    })
  }

  // 编译文本
  compileText(node) {
    let expr = node.textContent
    let reg = /\{\{([^}]+)\}\}/g // 匹配 {{}}
    let (reg.test(expr)) {
      // node this.vm.$data.expr
      const type = 'text'
      CompileUtil[type](node, this.vm, expr)
    }
  }
}

CompileUtil = {
  // 获取实例上对应的数据，如msg.a.b => 'hello'
  // msg.a.b => this.$data.msg => this.$data.msg => this.$data.msg.a.b
  getVal(vm, expr) {
    expr = expr.split('.')
    return expr.reduce((prev, next) => return prev[next], vm.$data) //看看reduce如何优雅的解决这种重复问题
  },
  // 获取编译文本后的结果，如{{msg}} => 'hello'
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      // args[1]是正则匹配括号内容，如{{msg}}的msg
      return this.getVal(vm, args[1])
    })
  },
  // 赋值
  // 例如给msg.a.b 赋新值，则取到最后再赋value值
  setVal(vm, expr, value) {
    expr = expr.split('.')
    return expr.reduce((prev, next, curIndex) => {
      if(curIndex === expr.length - 1) {
        return prev[next] = value
      }
    }, vm.$data)
  },
  // 文本处理
  text(node, vm, expr) {
    let updateFn = this.update['textUpdater']
    // 拿到{{a}}{{b}}的a,b
    expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      new Watcher(vm, args[1], newVal => {
        updateFn && updateFn(node, this.getTextVal(vm, expr)
      })
    })

    let value = this.getTextVal(vm, expr)
    updateFn && updateFn(node, value)
  },
  // 输入框处理
  model(node, vm, expr) {
    let updateFn = this.update['modelUpdater']
    // 这里应该加一个监控，数据变化时，应该调用watcher的callback, 将新值传过来
    new Watcher(vm, expr, newVal => {
      updateFn && updateFn(node, this.getVal(vm, expr))
    })

    updateFn && updateFn(node, this.getVal(vm, expr))
    node.addEventListener('input', e => {
      let newVal = e.target.value
      this.setVal(vm, expr, newVal)
    })
  },
  update: {
    // 文本更新
    textUpdater(node, value) {
      node.textContent = value
    },
    // 输入框更新
    modelUpdater(node, value) {
      node.value = value
    }
  }
}