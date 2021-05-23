// 这些基础方法已经完成，接下来就来实现diff算法；首先需要制定规则：
/**
 * 1. 当节点类型相同时，看属性是否相同，产生属性补丁包：{type: 'ATTES', attrs: {class: 'list'}}
 * 2. 新dom不存在：{type: 'REMOVE', index: xxx}
 * 3. 节点类型不相同，直接替换: {type: 'REPLACE', newNode: newNode}
 * 4. 文本内容变化：{type: 'TEXT', text: xxx}
*/

const ATTRS = 'ATTRS'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const TEXT = 'TEXT'

let Index = 0

// 深度遍历
function diff(oldTree, newTree) {
  let patches = {}
  let index = 0
  walk(oldTree, newTree, index, patches)
  return patches
}

function walk(oldNode, newNode, index, patches) {
  let currentPatch = [] //每个元素都有一个补钉对象

  if(!newNode) { // 节点被删除
    currentPatch.push({
      type: REMOVE,
      index
    })
  } else if(_isString(oldNode) && _isString(newNode)) { // 判断文本是否变化
    if(oldNode !== newNode) {
      currentPatch.push({
        type: TEXT,
        text: newNode
      })
    }
  } else if(oldNode.nodeType === newNode.nodeType) { // 判断属性是否更改
    let attrs = _diffAttr(oldNode.props, newNode.props)
    if(Object.keys(attrs).length > 0) {
      currentPatch.push({
        type: ATTRS,
        attrs
      })
    }
    // 如果有子节点，递归遍历
    _diffChildren(oldNode.children, newNode.children, index, patchs)
  } else{ // 节点被替换
    currentPatch.push({
      type: REPLACE,
      newNode
    })
  }
  if(currentPatch.length > 0) { // 当前元素确实有补丁
    // 将元素和补丁对应起来，放到大的补丁中
    patches[index] = currentPatch
  }
}

function _diffAttr(oldAttrs, newAttrs) {
  let patch = {}

  // 直接判断老属性和新属性关系
  for(const key in oldAttrs) {
    if(oldAttr[key] !== newAttrs[key]) patch[key] = newAttrs[key]
  }

  // 老节点没有新节点的属性
  for(const key in newAttrs) {
    if(!oldAttrs.hasOwnProperty(key)) patch[key] = newAttrs[key]
  }

  return patch
}

function _isString(node) {
  return Object.prototype.toString.call(node) === '[object String]'
}

function _diffChildren(oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, idx) => {
    // index 每次传给walk时，index是递增的，定义全局变量Index, 所有的基于统一序号实现
    walk(child, newChildren[idx], ++index, patches)
  })
}

export default diff

// 通过diff方法，我们能对两个虚拟dom产生完整的patches对象（详细记录了更改信息），以便后续的更新操作