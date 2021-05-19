import React, { Component } from 'react'
import { Consumer } from './context'

export default class Redirect extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Consumer>
        {state => {
          state.history.push(this.props.to) // 重定向
          return null
        }}
      </Consumer>
    )
  }
}