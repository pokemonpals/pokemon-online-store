import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
//material ui:

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default App
