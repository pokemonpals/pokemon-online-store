import React, {Component} from 'react'
import {UserForm} from './userForm'
import {connect} from 'react-redux'
import {signupThunk, auth} from '../store/userReducer'

class SignUp extends Component {
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
  componentDidMount() {
    // this.addNewUser()
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewUser(this.state)
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
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addNewUser: input => dispatch(signupThunk(input)),
  getUser: (email, password, method) => dispatch(auth(email, password, method))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
