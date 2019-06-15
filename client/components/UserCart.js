import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartItemsThunk} from '../store/cartReducer'

//material ui
import Button from '@material-ui/core/Button'

class Cart extends Component {
  //page will render what is inside of cart => what is inside cart === what is in Order model that is not purcashed?
  //checkout button onSubmit => update order in Order model to show purchased or purchase ? true AND post to suborder model
  //quanity input field to edit quantity => onChange update quantity in Order model
  //remove => onClick delete pokemon from Order model

  handleClick = () => {
    console.log("THE DELETE BUTTON'S CLICKED")
  }

  render() {
    console.log('this props', this.props)
    return (
      <div>
        <h2>Your Shopping Cart</h2>
        {/* list of pokemon followed by dropdown or input field (is there max amount for purchase --- how many in stock?)? */}
        {/* FOLLOWING CODE NEEDS TO BE CLEANED UP, CHECK PROPS */}

        {this.props.cart.length ? (
          <div>
            <ul style={{listStyle: 'none'}}>
              {this.props.cart.map(pokeObj => {
                return (
                  <li key={pokeObj.pokemonId}>
                    <img src={pokeObj.imageUrl} width="10" height="auto" />
                    {pokeObj.name}
                    {pokeObj.price}
                    <label htmlFor="edit">Quantity: </label>
                    <input
                      name="edit"
                      type="number"
                      min="1"
                      max="100"
                      value={pokeObj.quanitity}
                    />

                    <Button
                      onClick={this.handleClick}
                      type="submit"
                      value={pokeObj.id}
                      className="button"
                      style={{marginTop: 24}}
                      size="small"
                      color="primary"
                      variant="contained"
                    >
                      Remove
                    </Button>
                  </li>
                )
              })}
            </ul>
            <Button
              className="button"
              style={{marginTop: 24}}
              size="small"
              color="primary"
              variant="contained"
            >
              Complete Purchase
            </Button>
          </div>
        ) : (
          <div>
            <h3>Your PokeBag is empty</h3>
            <img src="https://unixtitan.net/images/mexican-transparent-pikachu-1.png" />
          </div>
        )}

        {/* value={pokemon.id} */}
        {/* onClick={this.handleClick} */}
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
  // receivedOrder: cartId => dispatch(cartThunk(cartId))
  getCart: userId => dispatch(getCartItemsThunk(userId))
})

export const UserCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
