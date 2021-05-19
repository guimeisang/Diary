import { React } from 'react';
import { Provider } from './context'

export default class HashRouter extends Component {
  constructor() {
    super()
    this.state = {
      location: {
        pathname: window.location.hash.slice(1) || '/'
      }
    }
  }
  componentDidMount() {
    window.location.hash = window.location.hash || '/'
    // 监听hash变化重新设置状态
    window.addEventListener('hashchange', ()=> {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1) || '/'
        }
      })
    })
  }
  render() {
    let value = {
      location: this.state.location,
      history: {
        push(to) {
          window.location.hash = to
        }
      }
    }
    // this.props.children 就是渲染子元素；value会将Provider传给Consumer，并且将父组件的state传下去
    return (
      <Provider value={value}>
        {this.props.children} 
      </Provider>
    )
  }
}