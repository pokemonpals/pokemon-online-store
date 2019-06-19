import React from 'react'
import {Link} from 'react-router-dom'
export const OAuthLogin = props => {
  return (
    <form method="get" action="/google">
      <Link>Login with Google</Link>
    </form>
  )
}

// export default OAuthLogin
