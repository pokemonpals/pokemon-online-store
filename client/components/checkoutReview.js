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
  console.log(props)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

// class Review extends React.Component {
//   constructor() {
//     super()
//     this.classes = useStyles()
//   }
//   // classes = useStyles()
//   render() {
//     // console.log('PROPS!', this.props)
//     return (
//       < React.Fragment >
//         <Typography variant="h6" gutterBottom>
//           Order summary
//         </Typography>
//         <List disablePadding>
//           {products.map(product => (
//             <ListItem className={this.classes.listItem} key={product.name}>
//               <ListItemText primary={product.name} secondary={product.desc} />
//               <Typography variant="body2">{product.price}</Typography>
//             </ListItem>
//           ))}
//           <ListItem className={this.classes.listItem}>
//             <ListItemText primary="Total" />
//             <Typography variant="subtitle1" className={this.classes.total}>
//               $34.06
//             </Typography>
//           </ListItem>
//         </List>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6" gutterBottom className={this.classes.title}>
//               Shipping
//             </Typography>
//             <Typography gutterBottom>John Smith</Typography>
//             <Typography gutterBottom>{addresses.join(', ')}</Typography>
//           </Grid>
//           <Grid item container direction="column" xs={12} sm={6}>
//             <Typography variant="h6" gutterBottom className={this.classes.title}>
//               Payment details
//             </Typography>
//             <Grid container>
//               {payments.map(payment => (
//                 <React.Fragment key={payment.name}>
//                   <Grid item xs={6}>
//                     <Typography gutterBottom>{payment.name}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography gutterBottom>{payment.detail}</Typography>
//                   </Grid>
//                 </React.Fragment>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </React.Fragment >
//     )
//   }
// }

const mapStateToProps = state => ({
  cart: state.cart.pokemon,
  orderId: state.cart.order,
  userId: state.user.id
})
// const mapDispatchToProps = dispatch => ({
//   getCart: userId => dispatch(getCartItemsThunk(userId)),
//   removePokemon: (userId, pokemonId) =>
//     dispatch(removePokemonThunk(userId, pokemonId)),
//   updateCart: (pokemonId, quantity, orderId) =>
//     dispatch(updateCartItemsThunk(pokemonId, quantity, orderId))
// })

export default connect(mapStateToProps)(Review)
