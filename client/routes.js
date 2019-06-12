import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Link as RouterLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, UserCart} from './components'
import {productList} from './components/productList'
import {me} from './store'

import Link from '@material-ui/core/Link'
import {SinglePokemon} from './components/SinglePokemon'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={productList} />
        <Route exact path="/products/:pokemonId" component={SinglePokemon} />
        <Route exact path="/products" component={productList} />
        <Route exact path="/cart" component={UserCart} />'
        <Route path="/login" component={Login} />'
        {/* <Route path="/signup" component={Signup} /> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={productList} /> */}
      </Switch>
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
