import React from 'react'

//material ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const UpdateNameForm = function(props) {
  const firstName = props.user.firstName
  const lastName = props.user.lastName

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter new name information below:
          </DialogContentText>

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

export default UpdateNameForm
