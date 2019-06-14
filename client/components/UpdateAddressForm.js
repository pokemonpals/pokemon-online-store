import React from 'react'

//material ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const UpdateAddressForm = function(props) {
  const address = props.user.address
  const city = props.user.city
  const state = props.user.state
  const zipcode = props.user.zipcode

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter new address information below:
          </DialogContentText>

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

export default UpdateAddressForm
