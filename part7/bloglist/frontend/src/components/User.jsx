import React from "react"
import userService from "../services/users"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const User = () => {
  const [users, setUsers] = useState([])
  const id = useParams().id
  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  const user = users.find((user) => user.id === id)

  if (!user) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }
  if (user.blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        <p>User has no blogs</p>
      </div>
    )
  }
  return (
    <div>
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default User
