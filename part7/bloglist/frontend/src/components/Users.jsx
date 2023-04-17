import React from "react"
import { useState, useEffect } from "react"
import userService from "../services/users"
import { Link } from "react-router-dom"

const Users = ({ user }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  return (
    <div className="userlist">
      <h2>Users</h2>
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
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users