import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, SignUp, UserHome, UserCart} from './components'
import {productList} from './components/productList'
import {me} from './store'
import Home from './components/Home'
import {SinglePokemon} from './components/SinglePokemon'
import {getCartItemsThunk} from './store/cartReducer'
import AdminHome from './components/adminHome'
import AdminPokemonView from './components/adminPokemonView'
import Checkout from './components/Checkout'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    this.props.getCart(this.props.userId)
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/admin/products" component={AdminPokemonView} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/products" component={productList} />
        <Route exact path="/products/:pokemonId" component={SinglePokemon} />
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={UserCart} />
        <Route exact path="/checkout" component={Checkout} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/me" component={UserHome} />
          </Switch>
        )}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
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
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  getCart: userId => dispatch(getCartItemsThunk(userId))
})

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
