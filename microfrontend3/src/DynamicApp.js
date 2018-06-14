import * as React from 'react'

class DynamicApp extends React.Component {

  handleRef = (element) => {
    if (element) {
      this.element = element
    }
  }
  startApp = () => {
    window.microfrontend3.start(this.element, this.props)
  }
  stopApp = () => {
    const isSuccess = window.microfrontend3.stop(this.element)
    if (isSuccess) {
      console.log('Detached app: ', this.props, this.element)
    } else {
      console.log('Fail to detached app: ', this.props, this.element)
    }
  }

  componentDidMount () {
    this.startApp()
  }

  componentWillUnmount () {
    this.stopApp()
  }

  render () {
    return (<div {...this.props} ref={this.handleRef}/>)
  }
}

export default DynamicApp
