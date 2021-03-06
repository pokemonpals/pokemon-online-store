import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartItemsThunk,
  removePokemonThunk,
  updateCartItemsThunk
} from '../store/cartReducer'

//material ui
import Button from '@material-ui/core/Button'
import {Typography} from '@material-ui/core'

class Cart extends Component {
  constructor() {
    super()
    this.state = {}
  }
  // shouldComponentUpdate() {
  //   if (this.props.userId && !this.props.order || !this.props.userId) {
  //     return false
  //     } else {
  //       return true
  //     }
  // }

  handleRemove = evt => {
    evt.preventDefault()

    this.props.removePokemon(this.props.orderId, evt.target.value)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })

    this.props.updateCart(
      event.target.id,
      event.target.value,
      this.props.orderId
    )
    this.props.getCart(this.props.userId)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.history.push('/checkout')
  }

  render() {
    return (
      <div align="center">
        <h2>Your Shopping Cart</h2>
        {this.props.cart && this.props.cart.length ? (
          <form>
            <ul style={{listStyle: 'none'}}>
              {this.props.cart.map(pokeObj => {
                return (
                  <li key={pokeObj.id}>
                    <img src={pokeObj.imageUrl} width="150" height="auto" />
                    <Typography>{pokeObj.name}</Typography>
                    <Typography>$ {pokeObj.price}</Typography>
                    <label htmlFor={pokeObj.name}>Quantity: </label>
                    <input
                      id={pokeObj.id}
                      name={pokeObj.name}
                      type="number"
                      min="1"
                      max="100"
                      value={
                        this.state[pokeObj.name] === undefined
                          ? pokeObj.suborder.quantity
                          : this.state[pokeObj.name]
                      }
                      onChange={this.handleChange}
                    />

                    <button
                      onClick={this.handleRemove}
                      type="submit"
                      value={pokeObj.id}
                      // className="button"
                      // style={{marginTop: 24}}
                      // size="small"
                      // color="primary"
                      // variant="contained"
                    >
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>
            <Button
              className="submit"
              onClick={this.handleSubmit}
              style={{marginTop: 24}}
              size="small"
              color="primary"
              variant="contained"
            >
              Continue to Checkout
            </Button>
          </form>
        ) : !this.props.orderId ? null : (
          <div>
            <h3>Your PokeBag is empty</h3>
            <img
              src="https://unixtitan.net/images/mexican-transparent-pikachu-1.png"
              width="500"
              height="auto"
            />
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cart: state.cart.pokemon,
  orderId: state.cart.order,
  userId: state.user.id
})
const mapDispatchToProps = dispatch => ({
  getCart: userId => dispatch(getCartItemsThunk(userId)),
  removePokemon: (userId, pokemonId) =>
    dispatch(removePokemonThunk(userId, pokemonId)),
  updateCart: (pokemonId, quantity, orderId) =>
    dispatch(updateCartItemsThunk(pokemonId, quantity, orderId))
})

export const UserCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
