import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSinglePokemonThunk} from '../store/pokemonReducer'
import {addToCartThunk} from '../store/cartReducer'
import PokemonRender from './pokemonRender'

class DisconnectedSinglePokemon extends Component {
  componentDidMount() {
    console.log('DID MOUNT IN SINGLE POKEMON')
    this.props.getSinglePokemon(this.props.match.params.pokemonId)
  }
  handleClick = evt => {
    evt.preventDefault()
    console.log('clicked')
    this.props.addToCart(evt.target.value, this.props.user.id)
  }

  render() {
    return (
      <PokemonRender
        pokemon={this.props.pokemon}
        user={this.props.user}
        isLoading={this.props.isLoading}
        addToCart={this.props.addToCart}
        getSinglePokemon={this.props.getSinglePokemon}
        handleClick={this.handleClick}
      />
    )
  }
}

const mapStateToProps = state => ({
  pokemon: state.pokemons[0],
  isLoading: state.loading,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getSinglePokemon: pokemonId => dispatch(getSinglePokemonThunk(pokemonId)),
  addToCart: (pokemonId, userId) => dispatch(addToCartThunk(pokemonId, userId))
})

export const SinglePokemon = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSinglePokemon
)
