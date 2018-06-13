import React, { Component } from 'react'

function emit (eventName, data) {
  window.eev ? eev.emit(eventName, data) : console.log(eventName, data)
}

function updateCount ({count}) {
  return ({count: count + 1})
}

function emitCountUpdatedEvent (args) {
  emit('micro3-state-changed', args)
}

export class App extends Component {
  state = {
    hello: 'React 0.14 Web Component',
    count: 0
  }

  handleClick = () => {
    this.setState(updateCount, () => emitCountUpdatedEvent(this.state))
  }

  render () {
    return (
      <div>
        <h3>Title: {this.props.title}</h3>
        <p>Greeting: {this.state.hello}</p>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
