import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSinglePokemonThunk} from '../store/pokemonReducer'
import {addToCartThunk} from '../store/cartReducer'
import {Link} from 'react-router-dom'

//material ui
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

class DisconnectedSinglePokemon extends Component {
  componentDidMount() {
    this.props.getSinglePokemon(this.props.match.params.pokemonId)
  }
  handleClick = evt => {
    evt.preventDefault()
    this.props.addToCart(evt.target.value, this.props.user.id)
    // if (this.props.user.id) {

    // }
  }

  render() {
    if (!this.props.isLoading) {
      if (this.props.pokemon) {
        const pokemon = this.props.pokemon
        return (
          <div>
            <div id="pokemon" className="container">
              <Card props={pokemon}>
                <CardContent>
                  <img src={pokemon.imageUrl} />
                  <Typography variant="body2">{pokemon.name}</Typography>
                  <Typography variant="body2">$ {pokemon.price}</Typography>
                  <Typography variant="caption">
                    {pokemon.description}
                  </Typography>
                  <button
                    type="submit"
                    value={pokemon.id}
                    onClick={this.handleClick}
                    className="button"
                    style={{marginTop: 24}}
                    size="small"
                    color="primary"
                    variant="contained"
                  >
                    Add To Cart
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      } else {
        return <div>Loading...</div>
      }
    } else {
      return 'LOADING'
    }
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
