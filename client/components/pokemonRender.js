import React from 'react'

// //material ui
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import {Paper} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import {blue} from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  paper: {
    width: 1200,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  media: {
    paddingTop: '56.25%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  button: {
    marginTop: 0,
    marginBottom: 0
    // marginRight: 'auto',
    // marginLeft: 'auto'
  },
  grid: {
    marginTop: 20,
    marginLeft: 30
  },
  price: {
    color: blue
  }
}))

const PokemonRender = props => {
  const classes = useStyles()
  if (!props.isLoading) {
    if (props.pokemon) {
      const pokemon = props.pokemon
      return (
        <Container component="main" maxWidth="xs">
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.grid}>
              <Paper className={classes.card}>
                <CardMedia
                  style={{paddingTop: '60%', marginTop: '30'}}
                  className={classes.media}
                  image={pokemon.imageUrl}
                  title={pokemon.name}
                />
                <CardContent>
                  <image src={pokemon.imageUrl} />
                  <Typography gutterBottom variant="headline" component="h2">
                    {pokemon.name}
                  </Typography>
                  <Typography variant="h6" className={classes.price}>
                    ${pokemon.price}
                  </Typography>
                  <Typography component="p">{pokemon.description}</Typography>
                </CardContent>
                <CardActions>
                  <button
                    type="submit"
                    value={pokemon.id}
                    onClick={props.handleClick}
                    // className="button"
                    // style={{marginTop: 24}}
                    // size="small"
                    // color="primary"
                    // variant="contained"
                  >
                    Add to Cart
                  </button>
                </CardActions>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )
    } else {
      return <div>Loading...</div>
    }
  } else {
    return 'LOADING'
  }
}

export default PokemonRender
