import React from 'react'
import AuthForm from './auth-form'

const Login = props => {
  const {handleSubmit} = props // passed via authform
  return (
    <form onSubmit={handleSubmit}>
      <AuthForm />
    </form>
  )
}
