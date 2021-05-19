import React, { Component } from 'react'
import { Consumer } from './context'

export default class Link extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Consumer>
        { state => {
          return <a onClick={() => {
            const { to } = this.props // <Links to="home">首页</Link>
            state.location.history.push(to)
          }}>{this.props.children}</a>
        } }
      </Consumer>
    )
  }
}