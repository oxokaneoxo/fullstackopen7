import React from 'react'
import Blog from '../components/Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

const Blogs = ({ blogFormRef, blogs, user, notificationMessage, errorMessage, addBlog, addLike, deleteBlog }) => {

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notificationMessage={notificationMessage} errorMessage={errorMessage} />

      <p>
        {user.name} logged in
        <button type='botton' name='Logout' onClick={() => handleLogout()}>Logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
        />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          addLike={addLike}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default Blogs