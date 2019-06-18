import React from 'react'
import AdminSearchForm from './adminSearchForm'
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
// import Paper from '@material-ui/core/Paper';

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
    console.log('admin props pokemon', this.props)
    return (
      <div>
        <h1>Users</h1>

        <h1>Products</h1>

        {/* <Paper> */}
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
        {/* </Paper> */}

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
