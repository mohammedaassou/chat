import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

function Authlogin() {
    const {loginWithRedirect , loginWithPopup , } = useAuth0()
  return (
    <button onClick={loginWithRedirect}>Authlogin</button>
  )
}

export default Authlogin