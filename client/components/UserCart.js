import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartItemsThunk} from '../store/cartReducer'
// import cartThunk from '../store/cartReducer'

//material ui
import Button from '@material-ui/core/Button'

class Cart extends Component {
  //page will render what is inside of cart => what is inside cart === what is in Order model that is not purcashed?
  //checkout button onSubmit => update order in Order model to show purchased or purchase ? true AND post to suborder model
  //quanity input field to edit quantity => onChange update quantity in Order model
  //remove => onClick delete pokemon from Order model
  componentDidUpdate = prevProps => {
    if (this.props.userId !== prevProps.userId) {
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
          {this.props.cart !== 'undefined' ? (
            this.props.cart.pokemons.map(pokeObj => {
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
  cart: state.cart.pokemons.pokemons,
  orderId: state.cart.order,
  userId: state.user.id
})
const mapDispatchToProps = dispatch => ({
  // receivedOrder: cartId => dispatch(cartThunk(cartId))
  getCart: orderId => dispatch(getCartItemsThunk(orderId))
})

export const UserCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

// const allPokemon = [
//   {
//     name: 'Pikachu',
//     type: 'Electric',
//     description: 'Known for its electrifying personality and lightning-quick speed, Pikachu will be sure to keep you on your toes. Do not be fooled by its cute appearance or you will be shocked by its cunning intelligence.',
//     cost: 1500.00,
//     imageUrl: 'https://cdn.bulbagarden.net/upload/b/b8/025Pikachu_LG.png'
//   },
//   {
//     name: 'Charmander',
//     type: 'Fire',
//     description: 'With its ability to light fire, Charmander is a a great pal to consider for lovers of the outdoors. It will light your campfire, warm your heart, and set your world aflame with its unwavering loyalty.',
//     cost: 1500.00,
//     imageUrl: 'https://cdn.bulbagarden.net/upload/7/73/004Charmander.png'
//   },
//   {
//     name: 'Squirtle',
//     type: 'Water',
//     description: 'As one of the more playful Pokemon, Squirtle will be overflowing with ideas on how to keep you entertained with its refresheningly cool personality.',
//     cost: 1500.00,
//     imageUrl: 'https://cdn.bulbagarden.net/upload/3/39/007Squirtle.png'
//   },
//   {
//     name: 'Bulbasaur',
//     type: 'Grass',
//     description: 'With a gentle and calm demeanor, Bulbasaur is perfect for those looking for a low-maintenance pal.',
//     cost: 1500.00,
//     imageUrl: 'https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png'
//   },
// ]
