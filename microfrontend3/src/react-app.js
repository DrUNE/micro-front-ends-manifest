import './react-app.css'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { App } from './App'
import { Eev } from './eev'

if (!window.eev) {
  window.eev = new Eev()
}

console.log('React 0.14 connected');

  render(<App title={'React 0.14 Separate Running App'}/>, document.getElementById('react-app-old'));

window.microfrontend3 = {
  start(attachToElement, props){
    return render(<App {...props}/>, attachToElement);
  },
  stop(detachFromElement){
    return unmountComponentAtNode(detachFromElement)
  }
}