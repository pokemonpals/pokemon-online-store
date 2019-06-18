import React, {Component} from 'react'
import UpdateAddressForm from './UpdateAddressForm'
import UpdateEmailForm from './UpdateEmailForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateNameForm from './UpdateNameForm'
import Typography from '@material-ui/core/Typography'

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

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.props.user.id, this.state)
  }

  render() {
    return (
      <div>
        <Typography type="primary"> My Profile:</Typography>
        <UpdateEmailForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state}
          updateUser={this.props.updateUser}
        />
        <div />
        <UpdateNameForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state}
          updateUser={this.props.updateUser}
        />
        <UpdatePasswordForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state}
          updateUser={this.props.updateUser}
        />
        <UpdateAddressForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state}
          updateUser={this.props.updateUser}
        />
      </div>
    )
  }
}
