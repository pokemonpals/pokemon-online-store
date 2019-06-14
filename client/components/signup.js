import React, {Component} from 'react'
import {UserForm} from './userForm'
import {connect} from 'react-redux'
import {signupThunk} from '../store/userReducer'

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
    console.log('this.state', this.state)
    this.props.addNewUser(this.state)
  }

  render() {
    console.log('this.props', this.props)
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
  addNewUser: input => dispatch(signupThunk(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
