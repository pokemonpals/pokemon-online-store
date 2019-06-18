import React from 'react'
import {connect} from 'react-redux'
import {
  getCartItemsThunk,
  removePokemonThunk,
  updateCartItemsThunk
} from '../store/cartReducer'

//material ui:
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

const products = [
  {name: 'Product 1', desc: 'A nice thing', price: '$9.99'},
  {name: 'Product 2', desc: 'Another thing', price: '$3.45'},
  {name: 'Product 3', desc: 'Something else', price: '$6.51'},
  {name: 'Product 4', desc: 'Best thing of all', price: '$14.11'},
  {name: 'Shipping', desc: '', price: 'Free'}
]
const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA'
]
const payments = [
  {name: 'Card type', detail: 'Visa'},
  {name: 'Card holder', detail: 'Mr John Smith'},
  {name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
  {name: 'Expiry date', detail: '04/2024'}
]

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

function Review(props) {
  const classes = useStyles()
  const totalPrice = props.cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.suborder.quantity
  }, 0)
  console.log(props)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.cart.map(item => (
          <ListItem className={classes.listItem} key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`x${item.suborder.quantity}`}
            />
            <Typography variant="body2">{`$${item.price}`}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {`$${totalPrice}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {props.user.firstName} {props.user.lastName}
          </Typography>
          <Typography gutterBottom>
            {props.user.address}, {props.user.city}, {props.user.state},{' '}
            {props.user.zipcode}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Type</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{props.user.cardName}</Typography>
              </Grid>
            </React.Fragment>

            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Holder</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {props.user.firstName} {props.user.lastName}
                </Typography>
              </Grid>
            </React.Fragment>

            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{props.user.cardNumber}</Typography>
              </Grid>
            </React.Fragment>

            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Expiry Date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{props.user.expDate}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  cart: state.cart.pokemon,
  orderId: state.cart.order,
  userId: state.user.id,
  user: state.user
})
// const mapDispatchToProps = dispatch => ({
//   getCart: userId => dispatch(getCartItemsThunk(userId)),
//   removePokemon: (userId, pokemonId) =>
//     dispatch(removePokemonThunk(userId, pokemonId)),
//   updateCart: (pokemonId, quantity, orderId) =>
//     dispatch(updateCartItemsThunk(pokemonId, quantity, orderId))
// })

export default connect(mapStateToProps)(Review)
