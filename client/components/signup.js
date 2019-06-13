import React, {Component} from 'react'
import {UserForm} from './UserForm'
import {connect} from 'react-redux'
import {signupThunk} from '../store/userReducer'

export class SignUp extends Component {
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
  // componentDidMount() {
  //   this.props.addNewUser()
  // }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.addNewUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    return (
      <div>
        <UserForm
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

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addNewUser: () => dispatch(signupThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
