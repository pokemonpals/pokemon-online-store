import React from 'react'
import {Link} from 'react-router-dom'

//material ui:
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const PokemonCard = props => {
  return (
    <Card key={props.pokemon.id}>
      <Link to={`/products/${props.pokemon.id}`}>
        <CardMedia
          style={{height: 0, paddingTop: '56.25%', marginTop: '30'}}
          image={props.pokemon.imageURL}
          title={props.pokemon.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            $ {props.pokemon.price}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}

export default PokemonCard
