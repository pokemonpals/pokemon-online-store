import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateUserThunk, getUserOrdersThunk} from '../store/userReducer'
import UpdateUserProfile from './UpdateUserProfile'

/**
 * COMPONENT
 */

class UserHome extends Component {
  componentDidMount() {
    this.props.userOrders(this.props.user.id)
  }
  render() {
    console.log(this.props, 'THE PROPS IN USER HOME')
    return (
      <div>
        <h3>Welcome, {this.props.user.email}</h3>
        <UpdateUserProfile
          user={this.props.user}
          updateUser={this.props.updateUser}
        />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  user: state.user,
  email: state.user.email,
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  updateUser: (userID, updatedUser) =>
    dispatch(updateUserThunk(userID, updatedUser)),
  userOrders: userId => dispatch(getUserOrdersThunk(userId))
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
