// import React from 'react'

//materialUI
// import {withStyles} from '@material-ui/core/styles'
// import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
// import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
// import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
// import Typography from '@material-ui/core/Typography'

import React from 'react'
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
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
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
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  section1: {
    margin: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    margin: theme.spacing(3, 1, 1)
  }
}))

const OrderHistory = function(props) {
  const classes = useStyles()
  // if (props.user.id) {
  // props.getUserOrders(props.user.id)
  // } else {
  //   return <h1>...LOADING</h1>
  // // props.getUserOrders(props.user.id)
  // }
  // console.log(props, 'THE PROPS IN ORDER HISTORY')

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
              Order History {console.log(props, 'THE PROPS IN ORDER HISTORY')}
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
                {console.log('PROPS.ORDERS', props.orders)}
                <ul style={{listStyle: 'none'}}>
                  {props.orders ? (
                    props.orders.map(order => {
                      return (
                        <div className={classes.root} key={order.id}>
                          <div className={classes.section1}>
                            <Grid container alignItems="center">
                              <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                  Order Number {order.id}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography gutterBottom variant="h6">
                                  {order.date}
                                </Typography>
                              </Grid>
                            </Grid>
                            {order.pokemons.map(pokemon => {
                              return (
                                <div key={pokemon.id}>
                                  <Typography
                                    color="textSecondary"
                                    variant="body2"
                                  >
                                    <img
                                      src={pokemon.imageUrl}
                                      width="100"
                                      height="auto"
                                    />
                                  </Typography>
                                  <Typography
                                    color="textSecondary"
                                    variant="body2"
                                  >
                                    {pokemon.name}
                                  </Typography>
                                  <Typography
                                    color="textSecondary"
                                    variant="body2"
                                  >
                                    Quantity: {pokemon.suborder.quantity}
                                  </Typography>
                                  <Typography
                                    color="textSecondary"
                                    variant="body2"
                                  >
                                    Price: {pokemon.price}
                                  </Typography>
                                </div>
                              )
                            })}
                          </div>
                          {/* <Divider variant="middle" />
                          <div className={classes.section2}>
                            <Typography gutterBottom variant="body1">
                              Select type
                            </Typography>
                            <div>
                              <Chip className={classes.chip} label="Extra Soft" />
                              <Chip className={classes.chip} color="primary" label="Soft" />
                              <Chip className={classes.chip} label="Medium" />
                              <Chip className={classes.chip} label="Hard" />
                            </div>
                          </div>
                          <div className={classes.section3}>
                            <Button color="primary">Add to cart</Button>
                          </div> */}
                        </div>
                        // <li key={order.id}>
                        //   <Typography>Order Number: {order.id}</Typography>
                        //   <Typography>Order Date: {order.date}</Typography>
                        //   {order.pokemons.map(pokemon => {
                        //     return (
                        //       <div key={pokemon.id}>
                        //         <img
                        //           src={pokemon.imageUrl}
                        //           width="150"
                        //           height="auto"
                        //         />
                        //         {pokemon.name}
                        //         {pokemon.suborder.quantity}
                        //         {pokemon.price}
                        //       </div>
                        //     )
                        //   })}
                        // </li>
                        // <ExpansionPanel defaultExpanded={false} key={order.id}>
                        //   <ExpansionPanelSummary
                        //     expandIcon={<ExpandMoreIcon />}
                        //     aria-controls="panel1c-content"
                        //     id="panel1c-header"
                        //   >
                        //     <Typography type="date">{order.date}</Typography>
                        //   </ExpansionPanelSummary>
                        // </ExpansionPanel>
                      )
                    })
                  ) : (
                    <div>LOADING</div>
                  )}
                </ul>
                {/* {props.orders.map(order => {
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
