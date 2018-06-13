import React, { Component } from 'react';

export class App extends Component {
    state = {
        hello: 'React 15 Web Component',
        count: 0
    };

    handleMicro3StateChanged = (data)=> this.setState({count: data.count})

    componentDidMount(){
      window.eev.on('micro3-state-changed', this.handleMicro3StateChanged)
    }

    componentWillUnmount(){
      window.eev.off('micro3-state-changed', this.handleMicro3StateChanged)
    }

    render() {
        return (
            <div>
                <h3>Title: {this.props.title}</h3>
                <p>Greeting: {this.state.hello}</p>
                <p>Micro 3 count: {this.state.count}</p>
            </div>
        )
    }
}
