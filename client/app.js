import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
//material ui:
import CssBaseline from '@material-ui/core/CssBaseline'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Routes />
      </BrowserRouter>
    </div>
  )
}

export default App
