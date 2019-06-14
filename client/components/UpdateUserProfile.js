import React, {Component} from 'react'
import BasicInfoForm from './BasicInfoForm'

export default class UpdateUserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.user.email,
      password: this.props.user.password,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      address: this.props.user.address,
      city: this.props.user.city,
      state: this.props.user.state,
      zipcode: this.props.user.zipcode,
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
        email: this.props.user.email,
        password: this.props.user.password,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        address: this.props.user.address,
        city: this.props.user.city,
        state: this.props.user.state,
        zipcode: this.props.user.zipcode
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
        <BasicInfoForm
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
