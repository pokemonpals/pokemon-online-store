import React from 'react'
import {connect} from 'react-redux'
import {getPokemonsThunk, addingPokemonThunk} from '../store/pokemonReducer'

class DisconnectedAdminPokemonView extends React.Component {
  componentDidMount() {
    // this.props.getAllPokemons()
  }
  render() {
    return (
      <div>
        {this.props.pokemons.map(pokemon => {
          return (
            <div key={pokemon.id}>
              <h5>{pokemon.name}</h5>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  isLoading: state.loading
})

const mapDispatchToProps = dispatch => ({
  getAllPokemons: () => dispatch(getPokemonsThunk()),
  addNewPokemon: formInput => dispatch(addingPokemonThunk(formInput))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdminPokemonView
)
