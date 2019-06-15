import React from 'react'
import {connect} from 'react-redux'
import {getPokemonsThunk, addingPokemonThunk} from '../store/pokemonReducer'

class DisconnectedAdminSearchForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      type: '',
      description: '',
      price: 1500,
      imageUrl: ''
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.addNewPokemon(this.state)
    this.setState({
      name: '',
      type: '',
      description: '',
      price: 1500,
      imageUrl: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Pokemon</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          reqruied
          onChange={this.handleChange}
        />
        <label>Type</label>
        <input
          type="text"
          name="type"
          value={this.state.type}
          required
          onChange={this.handleChange}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <label>Image</label>
        <input
          type="text"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />
        <button type="submit">Add Pokemon</button>
      </form>
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
  DisconnectedAdminSearchForm
)
