#### hash 路由原理
这部分讲解的是，基于hash变化，并且如何去监听hash的变化

```HTML
<body>
  <a href="#/a">a</a>
  <a href="#/b">b</a>
</body>

<script>
  window.addEventListener('hashchange', () => {
    console.log(window.location.hash)
  })
</script>
```

#### history 路由原理
这部分是使用history去修改路径，并且监听popstate这个事件来监听浏览器的前进后退

```html
<body>
    <a onclick="push('/a')">a</a>
    <a onclick="push('/b')">b</a>
</body>
<script>
  function push(path) {
    history.pushState({
        p: path
    }, null, path)
  }
  
  // 浏览器前进和后退
  window.addEventListener('popstate', (e) => {
    console.log(e)
  })
</script>

```

#### react中 react-router的使用示例

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from './react-router-dom'
import A from './A'
import B from './B'
import C from './C'

export default class App extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <Router>
        <div>
          <Route Path='/a' component={A} exact='true'></Route>
          <Route Path='/b' component={B}></Route>
          <Route Path='/c' component={C}></Route>
        </div>
      </Router>
    )
  }
}

render(<App/>, window.root)

```

