// import React from 'react'

//materialUI
// import {withStyles} from '@material-ui/core/styles'
// import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
// import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
// import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
// import Typography from '@material-ui/core/Typography'

import React, {Component} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
// import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import {getUserOrdersThunk} from '../store/userReducer'
import {connect} from 'react-redux'

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

const OrderHistory = function(props) {
  const classes = useStyles()
  if (props.user.id) {
    props.getUserOrders(props.user.id)
  } else {
    return <h1>...LOADING</h1>
  }
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
              Order History
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              view past orders
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <form onSubmit={props.handleSubmit}>
              <DialogContent>
                {/* {props.cart.map(order => {
                  return (
                    <ExpansionPanel defaultExpanded={false} key={order.id}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                      >
                        <Typography>{order.id}</Typography>
                      </ExpansionPanelSummary>
                    </ExpansionPanel>
                  )
                })} */}
                {/* <TextField
                  margin="dense"
                  id="passwordText"
                  name="password"
                  label="Password"
                  // value={password}
                  onChange={props.handleChange}
                  fullWidth
                /> */}
              </DialogContent>
              {/* <DialogActions>
                <Button
                  className="button"
                  type="submit"
                  color="primary"
                  expanded={false}
                >
                  Update
                </Button>
              </DialogActions> */}
            </form>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
const mapStateToProps = state => ({
  orders: state.user.orders,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  getUserOrders: userId => dispatch(getUserOrdersThunk(userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)

// const ExpansionPanel = withStyles({
//   root: {
//     border: '1px solid rgba(0, 0, 0, .125',
//     boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0,
//     },
//     '&:before': {
//       display: 'none',
//     },
//     '&$expanded': {
//       margin: 'auto',
//     },
//   },
//   expanded: {}
// })(MuiExpansionPanel)

// const ExpansionPanelSummary = withStyles({
//   root: {
//     backgroundColor: 'rgba(0, 0, 0, .03)',
//     borderBottom: '1px solid rgba(0, 0, 0, .125)',
//     marginBottom: -1,
//     minHeight: 56,
//   '&$expanded': {
//     minHeight: 56,
//     },
//   },
//   content: {
//     '&$expanded': {
//       margin: '12px 0',
//     },
//   },
//   expanded: {}
// })(MuiExpansionPanelSummary)

// const ExpansionPanelDetails = withStyles(theme => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiExpansionPanelDetails)

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

// export default function CustomizedExpansionPanels() {
//   const [expanded, setExpanded] = React.useState('panel1')
//   const handleChange = panel => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };
//   return (
//     <div>
//       <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//         <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
//           <Typography>Collapsible Group Item #1</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
//             elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
//         <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
//           <Typography>Collapsible Group Item #2</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
//             elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//         <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
//           <Typography>Collapsible Group Item #3</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
//             elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//     </div>
//   )
// }
