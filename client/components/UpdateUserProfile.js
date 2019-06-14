import React, {Component} from 'react'
import ProfileUpdateForm from './ProfileUpdateForm'
import UpdateEmailForm from './UpdateEmailForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateNameForm from './UpdateNameForm'
import UpdateAddressForm from './UpdateAddressForm'

export default class UpdateUserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.user.email,
      password: props.user.password,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      address: props.user.address,
      city: props.user.city,
      state: props.user.state,
      zipcode: props.user.zipcode,
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      await this.props.updateUser({
        email: this.state.user.email,
        password: this.state.user.password,
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        address: this.state.user.address,
        city: this.state.user.city,
        state: this.state.user.state,
        zipcode: this.state.user.zipcode
      })
    } catch (err) {
      this.setState({
        error: err
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Update your profile:</h1>
        <UpdateEmailForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state}
          updateUser={this.props.updateUser}
          handleClose={this.props.handleClose}
          open={this.props.open}
        />
        <UpdatePasswordForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state}
          updateUser={this.props.updateUser}
          handleClose={this.props.handleClose}
          open={this.props.open}
        />
        <UpdateNameForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state}
          updateUser={this.props.updateUser}
          handleClose={this.props.handleClose}
          open={this.props.open}
        />
        <UpdateAddressForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state}
          updateUser={this.props.updateUser}
          handleClose={this.props.handleClose}
          open={this.props.open}
        />
      </div>
    )
  }
}
