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

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    console.log('COMPONENTDIDUPDATE IS HAPPENING!!!!')
    if (
      prevProps.userId !== this.props.userId ||
      prevProps.cart !== prevState.orderId
    ) {
      this.props.getCart(this.props.userId)
    }
  }

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
        <ul style={{listStyle: 'none'}}>
          {this.props.cart.length ? (
            this.props.cart.map(pokeObj => {
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

                  {/* {pokeObj.quantity} */}
                  {/* <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select> */}
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
            })
          ) : (
            <div>
              <h3>Your PokeBag is empty</h3>
              <img src="https://unixtitan.net/images/mexican-transparent-pikachu-1.png" />
            </div>
          )}
        </ul>
        {/* value={pokemon.id} */}
        {/* onClick={this.handleClick} */}

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
