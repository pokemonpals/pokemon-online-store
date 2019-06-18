import React from 'react'
import {connect} from 'react-redux'
import {getPokemonsThunk, addingPokemonThunk} from '../store/pokemonReducer'
import TextField from '@material-ui/core/TextField'

class DisconnectedAdminAddProductForm extends React.Component {
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
        <TextField
          id="name"
          name="name"
          label="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <TextField
          id="type"
          name="type"
          label="type"
          value={this.state.type}
          onChange={this.handleChange}
        />
        <TextField
          id="description"
          name="description"
          label="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <TextField
          id="price"
          name="price"
          label="price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <TextField
          id="imageUrl"
          name="imageUrl"
          label="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />
        <button type="submit">Add Pokemon</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addNewPokemon: formInput => dispatch(addingPokemonThunk(formInput))
})

export default connect(null, mapDispatchToProps)(
  DisconnectedAdminAddProductForm
)
