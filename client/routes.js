import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  BrowserRouter,
  withRouter,
  Route,
  Switch,
  Link as RouterLink
} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {productList} from './components/productList'
import {me} from './store'

//material ui:
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    // const {isLoggedIn} = this.props
    return (
      <BrowserRouter>
        <div>
          <CssBaseline />
          <main>
            <Switch>
              <Route path="/products" component={productList} />
              <Route path="/login" component={Login} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
