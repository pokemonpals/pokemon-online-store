import React from 'react'

//material ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const UpdatePasswordForm = function(props) {
  const password = props.user.password

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter new password information below:
          </DialogContentText>

          <TextField
            margin="dense"
            id="passwordText"
            name="password"
            label="Password"
            value={password}
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

export default UpdatePasswordForm
