window.ReactDOM = {
  render: (el, domEl) => {
    domEl.appendChild(el)
  }
}

window.React = {
  createElement,
  Component
}

class Component {
  constructor(props) {
    this.props = props
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)
    // 这里实现肯定是太暴力了
    reRender()
  }
}

function reRender() {
  while(rootDOMElement.hasChildNodes()) {
    rootDOMElement.removeChild(rootDOMElement.lastChild)
  }
  ReactDOM.render(rootReactElement, rootDOMElement)
}


function creatElement(el, props, ...children) {
  return anElement(el, children)
}

function anElement(element, children) {
  if(isClass(element)) {
    const component = new element()
    return component.render()
  }else if(typeof element === 'function') {
    return element()
  }else {
    const anElement = document.createElement(elment)
    children.forEach(child => {
      if(typeof child === 'object') {
        anElement.appendChild(child)
      }else {
        anElement.innerHTML += child
      }
    })
  }
  return anElement
}

function isClass(func) {
  return typeof func === "function" && /^class/.test(Function.prototype.toString.call(func))
}