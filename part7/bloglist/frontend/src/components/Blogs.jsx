import React from "react"
import Blog from "../components/Blog"
import BlogForm from "./BlogForm"
import Notification from "./Notification"
import Togglable from "./Togglable"
import { useSelector } from "react-redux"

const Blogs = ({ blogFormRef, user }) => {
  const blogs = useSelector((state) => state.blogs)
  let sortedBlogs = [...blogs]
  sortedBlogs.sort((a, b) => b.likes - a.likes)

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="bloglist">
      <h2>Blogs</h2>

      <Notification />

      <p>
        {user.name} logged in
        <button type="botton" name="Logout" onClick={() => handleLogout()}>
          Logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default Blogs
