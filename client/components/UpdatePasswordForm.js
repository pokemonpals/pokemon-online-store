import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '100%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))
// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%'
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15)
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary
//   },
//   icon: {
//     verticalAlign: 'bottom',
//     height: 20,
//     width: 20
//   },
//   details: {
//     alignItems: 'center'
//   },
//   column: {
//     flexBasis: '100%'
//   },
//   helper: {
//     borderLeft: `2px solid ${theme.palette.divider}`,
//     padding: theme.spacing(1, 2)
//   },
//   link: {
//     color: theme.palette.primary.main,
//     textDecoration: 'none',
//     '&:hover': {
//       textDecoration: 'underline'
//     }
//   }
// }))

const UpdatePasswordForm = function(props) {
  const classes = useStyles()
  const password = props.user.password

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading} color="primary">
              Password
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              change my password
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <form onSubmit={props.handleSubmit}>
              <DialogContent>
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
                  type="submit"
                  color="primary"
                  expanded={false}
                >
                  Update
                </Button>
              </DialogActions>
            </form>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default UpdatePasswordForm
