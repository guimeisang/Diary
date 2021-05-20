### Context

```js
import React from 'react'
import PropTypes from 'prop-types'
const { Provider, Consumer } = React.createContext('default')

class Parent extends React.Component {
  state = {
    childContext: '123',
    newContext: '456'
  }

  getChildContext() {
    return { value: this.state.childContext, a: 'aaaaa' }
  }

  render() {
    return (
      <>
        <div>
          <label>childContext:</label>
          <input
            type="text"
            value={this.state.childContext}
            onChange={e => this.setState({ childContext: e.target.value })}
          />
        </div> 
        <div>
          <label>newContext:</label>
          <input
            type="text"
            value={this.state.newContext}
            onChange={e => this.setState({ newContext: e.target.value })}
          />
        </div>
        <Provider value={this.state.newContext}>{this.props.children}</Provider>
      </>
    ) 
  }
}

function Child(props, context) {
  return <Consumer>{
    value => {
      return <p>newContext: {value}</p>
    }
  }</Consumer>
}

export default () => {
  <Parent>
    <Child/>
  </Parent>
}
```

那么createContext 源码示例就看 createContext.ts 文件了