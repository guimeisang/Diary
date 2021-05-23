import { createElement, render, renderDOM } from './element'
import diff from './diff'
import patch from './patch'

let virtualDOM1 = createElement('ul', {
  class: 'list'
}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('li', {class: 'item'}, ['c']),
])

let virtualDOM2 = createElement('ul', {
  class: 'list'
}, [
  createElement('li', {class: 'item'}, ['1']),
  createElement('li', {class: 'item'}, ['2']),
  createElement('div', {class: 'item'}, ['c']),
])

let el = render(virtualDOM)
renderDOM(el, window.root)

// 给元素打补丁，重新更新视图
let patches = diff(virtualDOM1, virtualDOM2)
patch(el, patches)

// 此时dom diff 策略还存在很多问题 （这两个问题待会搜索下）
// 1. 如果同级只是交换节点位置，会导致重新渲染（应该只是交换位置）
// 2. 新增节点也不会被更新