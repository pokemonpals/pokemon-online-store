import React, {Component} from 'react'
import CheckoutFlow from './CheckoutFlow'
import {updateUserThunk} from '../store/userReducer'
import {connect} from 'react-redux'

//material ui:

class CheckoutPage extends Component(this.props) {
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.props.user.id, this.state)
  }

  render() {
    return (
      <CheckoutFlow user={this.props.user} updateUser={this.props.updateUser} />
    )
  }
}
const mapState = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateUser: (userID, updatedUser) =>
    dispatch(updateUserThunk(userID, updatedUser))
})

export default connect(mapState, mapDispatchToProps)(CheckoutPage)
