import React, { Component } from 'react'
import { Consumer } from './context'
import pathToReg from 'path-to-regexp'

export default class Router extends Component {
  constructor(){
    super()
  }
  render(){
    return(
      <Consumer>
        {state => {
          let pathname = state.location.pathname
          let children = this.props.children
          let _componennt = null;
          children.forEach(child => {
            const path = child.props.path || ''
            let reg = pathToReg(path, [], {end: 'false'})
            if(reg.test(pathname)) {
              _componennt = child
              return false
            }
          })
          return _componennt
        }}
      </Consumer>
    )
  }
}