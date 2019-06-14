import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/userReducer'
import UpdateUserProfile from './UpdateUserProfile'

/**
 * COMPONENT
 */

class UserHome extends Component {
  render() {
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
  email: state.user.email
})

const mapDispatchToProps = dispatch => ({
  updateUser: (userId, updatedUser) =>
    dispatch(updateUserThunk(userId, updatedUser))
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
