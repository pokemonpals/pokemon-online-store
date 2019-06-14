import React from 'react'
import AdminSearchForm from './adminSearchForm'
import {connect} from 'react-redux'
import {getPokemonsThunk, addingPokemonThunk} from '../store/pokemonReducer'

class DisconnectedAdmin extends React.Component {
  constructor(props) {
    super(props)
    //this state is to test functionaltiy only. This and forms should be moved to a new component later
  }
  componentDidMount() {
    this.props.getAllPokemons()
  }
  handlePokeClick = () => {
    console.log('POKEMON', this.props.pokemons)
    // return (
    //   <table>
    //     {this.props.pokemons.map(pokemon => {
    //       return (
    //         <tr>{pokemon.name}</tr>
    //       )
    //     })}
    // </table >
    //   // <div>
    //   //   {this.props.pokemon.map(pokemon => {
    //   //     return (
    //   //       <h5 key={pokemon.id}>{pokemon.name}</h5>
    //   //     )
    //   //   })}
    //   // </div>
    //   // )
  }
  render() {
    // console.log('admin props pokemon', this.props)
    return (
      <div>
        <h1>Users</h1>

        <h1>Products</h1>

        <button type="submit" onClick={this.handlePokeClick}>
          Showing All Pokemon for Admin
        </button>

        <div id="functionality-tests">
          <AdminSearchForm />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedAdmin)
