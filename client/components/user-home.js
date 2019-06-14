import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/userReducer'
import UpdateUserProfile from './UpdateUserProfile'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <UpdateUserProfile user={props.user} updateUser={props.updateUser} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: updatedUser => dispatch(updateUserThunk(updatedUser))
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
