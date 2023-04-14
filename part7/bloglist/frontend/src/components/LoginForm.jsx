import React from 'react'
import Notification from './Notification'

const loginForm = ({ handleLogin, username, setUsername, password, setPassword, errorMessage, notificationMessage }) => {
  return (
    <div>
      <h1>Log in to application</h1>
      <Notification errorMessage={errorMessage} notificationMessage={notificationMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id='password'
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

export default loginForm