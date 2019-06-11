import React from 'react'
import {Link} from 'react-router-dom'

//material ui:
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {CardActionArea} from '@material-ui/core'

const PokemonCard = props => {
  return (
    <Card key={props.pokemon.id}>
      <Link to={`/products/${props.pokemon.id}`}>
        <CardActionArea>
          <CardContent>
            <img src={props.pokemon.imageUrl} />
            {props.pokemon.name}
            <Typography gutterBottom variant="h5" component="h2">
              $ {props.pokemon.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default PokemonCard
