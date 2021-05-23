// createElement: 创建虚拟dom
// render: 将虚拟dom转化成真实dom
// renderDOM: 将元素节点插入页面上

// 虚拟dom元素
class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

// 创建虚拟dom
function createElement(type, props, children) {
  return new Element(type, props, children)
}

// 将vnode转化为真是dom
function render(eleObj) {
  let el = document.createElement(eleObj.type)
  for(let key in eleObj.props) {
    setAttr(el, key, eleObj.props[key])
  }
  eleObj.children.forEach(child => {
    // 存在一个递归的逻辑在此
    child = (child instanceof Element) ? render(child) : document.createTextNode(child)
    el.appendChild(child)
  })
  return el
}

// 将元素插入页面
function renderDOM(el, target) {
  target.appendChild(el)
}

// 设置属性
function setAttr(node, key, value){
  switch (key) {
    case 'value':
      if(node.tagName.toLowerCase === 'input' || node.tagName.toLowerCase === 'textarea') {
        node.value = value
      }else {
        node.setAttribute(key, value)
      }
      break;
    case 'style': 
      node.style.cssText = value
      break;
    default:
      break;
  }
}

export {
  createElement,
  render,
  Element,
  renderDOM,
  setAttr
}