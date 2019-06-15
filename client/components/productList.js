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
    console.log('props', this.props)
    if (!this.props.isLoading) {
      return (
        <div>
          <div id="products" className="container">
            <Grid container>
              {this.props.pokemons.map(pokemon => {
                return (
                  <Grid key={pokemon.id} item xs={12} sm={6}>
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
