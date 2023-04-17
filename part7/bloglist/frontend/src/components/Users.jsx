import React from "react"
import { useState, useEffect } from "react"
import userService from "../services/users"

const Users = ({ user }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  console.log("users", users)

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="userlist">
      <h2>Users</h2>
      <p>
        {user.name} logged in
        <button type="botton" name="Logout" onClick={() => handleLogout()}>
          Logout
        </button>
      </p>

      <table>
        <thead>
          <tr>
            <th>Names</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
