import React, { Component } from 'react'
import { Consumer } from './context'
import pathToReg from 'path-to-regexp'

export default class Route extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Consumer>
        { state => {
          // path component 是Route 中传递的
          let {path, component: Component, exact = false} = this.$props
          // pathname 是Provider中传下来的
          let pathname = state.location.pathname
          // 根据path实现正则，通过正则匹配，这里使用path-to-regexp第三方包
          let reg = pathToReg(path, [], {end: exact})
          let result = pathname.match(reg)
          // 如果命中了hash则返回传下来的组件
          if(result) {
            return <Compoennt></Compoennt>
          }
          return null
        } }
      </Consumer>
    )
  }
}
