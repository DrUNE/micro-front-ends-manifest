import React, { Component } from 'react'
import PropTypes from 'prop-types'

import uuid from 'uuid/v1'

import DynamicApp from './DynamicApp'

function emit (eventName, data) {
  window.eev ? eev.emit(eventName, data) : console.log(eventName, data)
}

function on (eventName, func) {
  window.eev.on(eventName, func);
}

function off (eventName, func) {
  window.eev.off(eventName, func);
}

function updateCount ({count}) {
  return ({count: count + 1})
}

function emitCountUpdatedEvent (args) {
  emit(APP_EVENT_NAME, args)
}

const APP_EVENT_NAME = 'micro3-state-changed';

export class App extends Component {
  state = {
    hello      : 'React 0.14 Web Component',
    count      : 0,
    attachedIds: [],
  }

  handleClick = () => {
    this.setState(updateCount, () => emitCountUpdatedEvent({...this.props, ...this.state}))
  }

  handleAddApp = () => {
    this.setState(({attachedIds}) => ({attachedIds: [uuid(), ...attachedIds]}))
  }
  handleRemoveApp = () => {
    this.setState(({attachedIds}) => ({attachedIds: attachedIds.slice(1)}))
  }

  handleOnMessage = (data) => {
    this.setState(state => ({messageData: data}))
  }

  componentDidMount () {
    on(APP_EVENT_NAME, this.handleOnMessage)
    console.log('Listening ON:', this.props)
  }

  componentWillUnmount () {
    off(APP_EVENT_NAME, this.handleOnMessage)
    console.log('Listening OFF', this.props)
  }

  render () {
    return (
      <div style={{
        padding: '16px',
        margin : '16px',
        border : 'solid 1px black'
      }}>
        <h3>Title: {this.props.title}</h3>
        <p>Greeting: {this.state.hello}</p>
        <p>{this.state.count}</p>
        <p>Message data: {JSON.stringify(this.state.messageData)}</p>
        <button onClick={this.handleClick}>+</button>
        <button onClick={this.handleAddApp}>Add app</button>
        <button onClick={this.handleRemoveApp}>Remove app</button>
        {this.state.attachedIds.map(id => (<DynamicApp key={id} title={`Attached App ${id}`}></DynamicApp>))}
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
}

export default App