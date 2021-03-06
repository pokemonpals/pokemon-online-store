import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPokemonsThunk} from '../store/pokemonReducer'
import PokemonCard from '../components/PokemonCard'
//material ui:
import Grid from '@material-ui/core/Grid'

class DisconnectedProductList extends Component {
  componentDidMount() {
    this.props.getAllPokemons()
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <div>
          <div className="container">
            <Grid container spacing={2} style={{padding: 24}}>
              {this.props.pokemons.map(pokemon => {
                return (
                  <Grid key={pokemon.id} item xs={6} sm={3}>
                    <PokemonCard pokemon={pokemon} key={pokemon.id} />
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  isLoading: state.loading
})

const mapDispatchToProps = dispatch => ({
  getAllPokemons: () => dispatch(getPokemonsThunk())
})

export const productList = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedProductList
)
