import React from "react"
import Notification from "./Notification"
import { loginUser } from '../reducers/userReducer'

const loginForm = ({
  dispatch,
}) => {

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(loginUser(username, password))
  }

  return (
    <div>
      <h1>Log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default loginForm