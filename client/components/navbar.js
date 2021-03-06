import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

//material ui:

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

export function Navbar({handleClick, isLoggedIn}) {
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <div className="classes">
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Products" component={Link} to="/products" />
          {isLoggedIn ? (
            <div>
              <Tab label="Cart" component={Link} to="/cart">
                <img
                  id="bag"
                  src="https://img.icons8.com/color/420/pokebag.png"
                />
              </Tab>
              <Tab component={Link} to="/me" label="My Account" />
              <Tab
                label="Logout"
                onClick={handleClick}
                component={Link}
                to="#"
              />
            </div>
          ) : (
            <div>
              <Tab label="Login" component={Link} to="/login" />
              <Tab label="Sign Up" component={Link} to="/signup" />
            </div>
          )}
        </Tabs>
      </AppBar>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
