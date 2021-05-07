import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Mouse extends React.Component {
  state = { x: 0, y: 0 }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove} >
        { this.props.render(this.state) }
      </div>
    )
  }
}

const App = React.createElement({
  render() {
    return (
      <div>
        <Mouse render={ ({x, y}) => (
          <h1>The mouse position is {x, y}</h1>  
        ) }></Mouse>
      </div> 
    )
  }
})