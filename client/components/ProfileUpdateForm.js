import React from 'react'
// import { FormErrors } from './FormErrors';

//material ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const ProfileUpdateForm = function(props) {
  const email = props.user.email
  const password = props.user.password
  const firstName = props.user.firstName
  const lastName = props.user.lastName
  const address = props.user.address
  const city = props.user.city
  const state = props.user.state
  const zipcode = props.user.zipcode

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <DialogTitle id="form-dialog-title">
          Update Profile Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new information below:
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="emailText"
            name="email"
            label="Email"
            value={email}
            onChange={props.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="passwordText"
            name="password"
            label="Password"
            value={password}
            onChange={props.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="firstNameText"
            name="firstName"
            label="First Name"
            value={firstName}
            onChange={props.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="lastNameText"
            name="lastName"
            label="Last Name"
            value={lastName}
            onChange={props.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="addressText"
            name="address"
            label="Address"
            value={address}
            onChange={props.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="cityText"
            name="city"
            label="City"
            value={city}
            onChange={props.handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="stateText"
            name="state"
            label="State"
            value={state}
            onChange={props.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="zipcodeText"
            name="zipcode"
            label="Zip Code"
            value={zipcode}
            onChange={props.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="button"
            onClick={props.handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className="button"
            type="submit"
            onClick={props.handleClose}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </div>
  )
}

export default ProfileUpdateForm
