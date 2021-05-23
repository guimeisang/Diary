// 实现patch方法，根据diff产生的patches对象，完成真实dom的更新工作：
import {
  Element,
  render,
  setAttr
} from './element'

let allPatches
let index = 0

const ATTRS = 'ATTRS'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const TEXT = 'TEXT'

export default function patch(node, patches) {
  // 给元素打补丁
  allPatches = patches
  walk(node)
}

function walk(node) {
  // index 代表的就是层数
  let currentPatch = allPatches[index++]
  let childNodes = node.childNodes
  childNodes.forEach(child => {
    walk(child)
  })
  if(currentPatch) {
    doPatch(node, currentPatch)
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    switch(patch.type) {
      case ATTRS: 
        for(const key in patch.attrs) {
          let value = patch.attrs[key]
          if(value) {
            setAttr(node, key, value)
          }else { // 如果属性值为undefined则直接删除属性
            node.removeAttribute(key)
          } 
        }
        break;
      case REMOVE:
        node.parentNode.removeChild(node)
        break;
      case REPLACE:
        let newNode = patch.newNode instanceof Element ? render(path.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break;
      case TEXT:
        node.textContent = patch.text
        break;
    }
  })
}

// 当时还是有些坑，如果同级只是交换节点位置，会导致重新渲染（应该只是交换位置）（key可以解决该问题）
// 新增节点不会被更新