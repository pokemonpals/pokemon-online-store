import React, {Component} from 'react'
import userForm from './userForm'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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
    this.props.addNewUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    return (
      <div>
        <userForm
          handleSubmit={this.handleSubmit}
          addNewUser={this.props.addNewUser}
          handleChange={this.handleChange}
          user={this.state}
          handleClose={this.props.handleClose}
          open={this.props.open}
          // addOrUpdate="Add User"
        />
      </div>
    )
  }
}
