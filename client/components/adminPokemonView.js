import React from 'react'
import {connect} from 'react-redux'
import {getPokemonsThunk, addingPokemonThunk} from '../store/pokemonReducer'
import AdminAddProductForm from './adminAddProductForm'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const AdminPokemonView = props => {
  const {pokemons} = props
  return (
    <div>
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
          {pokemons.map(pokemon => {
            return (
              <TableRow key={pokemon.id}>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell>{pokemon.type}</TableCell>
                <TableCell>{pokemon.description}</TableCell>
                <TableCell>{pokemon.price}</TableCell>
                <TableCell>{pokemon.imageUrl}</TableCell>
                <button type="submit">Not working edit button</button>
                <button type="submit" id={pokemon.id}>
                  Not working delete button
                </button>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div>
        <AdminAddProductForm />
      </div>
    </div>
  )
}

export default AdminPokemonView
