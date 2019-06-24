import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DialogContent from '@material-ui/core/DialogContent'
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
                        </div>
                      )
                    })
                  ) : (
                    <div>LOADING</div>
                  )}
                </ul>
              </DialogContent>
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
