import React, {Component} from 'react'
import {updateUserThunk} from '../store/userReducer'
import {connect} from 'react-redux'

//material ui:
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

class CheckoutShipping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      address: this.props.user.address,
      city: this.props.user.city,
      state: this.props.user.state,
      zipcode: this.props.user.zipcode
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   this.props.updateUser(this.props.user.id, this.state)
  //   console.log('handleSubmit')
  // }

  render() {
    const firstName = this.props.user.firstName
    const lastName = this.props.user.lastName
    const address = this.props.user.address
    const city = this.props.user.city
    const state = this.props.user.state
    const zipcode = this.props.user.zipcode

    // console.log('this.props', this.props)
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <form noValidate onSubmit={this.props.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstNameText"
                name="firstName"
                value={firstName}
                label="First Name"
                onChange={this.props.handleChange}
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                value={lastName}
                label="Last name"
                onChange={this.props.handleChange}
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                value={address}
                onChange={this.props.handleChange}
                label="Address"
                fullWidth
                autoComplete="billing address-line1"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                value={city}
                onChange={this.props.handleChange}
                label="City"
                fullWidth
                autoComplete="billing address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                value={state}
                onChange={this.props.handleChange}
                label="State/Province/Region"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="zipcode"
                name="zipcode"
                value={zipcode}
                onChange={this.props.handleChange}
                label="Zip / Postal code"
                fullWidth
                autoComplete="billing postal-code"
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="saveAddress"
                    value="yes"
                    type="submit"
                  />
                }
                label="Use this address for payment details"
              /> */}
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
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

export default connect(mapState, mapDispatchToProps)(CheckoutShipping)
