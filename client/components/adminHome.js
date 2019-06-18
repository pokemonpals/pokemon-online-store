import React from 'react'
import AdminSearchForm from './adminAddProductForm'
import AdminPokemonView from './adminPokemonView'
import {connect} from 'react-redux'
import {getPokemonsThunk, addingPokemonThunk} from '../store/pokemonReducer'
import {Link} from 'react'

//Material-UI
// import MaterialTable from 'material-table';
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
}))

class DisconnectedAdmin extends React.Component {
  constructor() {
    super()
    // this.classes = useStyles()
  }
  componentDidMount() {
    this.props.getAllPokemons()
  }
  render() {
    console.log('admin props pokemon', this.props)
    return (
      <div>
        <h1>Users</h1>

        <h1>Products</h1>
        <div>
          <AdminPokemonView pokemons={this.props.pokemons} />
        </div>
        {/* Table that displays all products*/}
        {/* <form>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Name </TableCell>
                <TableCell> Type </TableCell>
                <TableCell> Description </TableCell>
                <TableCell> Price </TableCell>
                <TableCell> Image URL </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.pokemons.map(pokemon => {
                return (
                  <TableRow key={pokemon.id}>
                    <TableCell>{pokemon.name}</TableCell>
                    <TableCell>{pokemon.type}</TableCell>
                    <TableCell>{pokemon.description}</TableCell>
                    <TableCell>{pokemon.price}</TableCell>
                    <TableCell>{pokemon.imageUrl}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </form> */}

        <div id="functionality-tests" />
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
