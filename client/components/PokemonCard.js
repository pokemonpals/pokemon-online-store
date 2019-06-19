import React from 'react'
import {Link} from 'react-router-dom'

//material ui:
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    maxWidth: 375
  },
  media: {
    height: 300
  }
})

const PokemonCard = props => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link to={`/products/${props.pokemon.id}`}>
          <CardMedia
            className={classes.media}
            style={{paddingTop: '60%', marginTop: '30'}}
            image={props.pokemon.imageUrl}
            title={props.pokemon.name}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.pokemon.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            $ {props.pokemon.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/products/${props.pokemon.id}`}>
          <Button size="small" color="primary">
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default PokemonCard
