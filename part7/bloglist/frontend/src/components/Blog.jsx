import { useState } from "react"
import "./blog.css"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const Blog = ({ blog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? "none" : "" }
  const showWhenVisible = { display: detailsVisible ? "" : "none" }

  const dispatch = useDispatch()

  const addLike = (e, blog) => {
    dispatch(likeBlog(blog))
  }
  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div className="blog_container">
      <div style={hideWhenVisible} className="basic_details">
        <span className="basic_title">{blog.title}</span>
        <span className="basic_author"> by {blog.author}</span>
        <button
          onClick={() => setDetailsVisible(true)}
          className="blog_button"
          data-testid="view_button"
        >
          view
        </button>
      </div>

      <div style={showWhenVisible} className="extra_details">
        <span>{blog.title}</span>
        <span> by {blog.author}</span>
        <button
          onClick={() => setDetailsVisible(false)}
          className="blog_button"
        >
          hide
        </button>
        <p>Url: {blog.url}</p>
        <p>
          Likes: {blog.likes}{" "}
          <button
            className="like_button"
            data-testid="like_button"
            onClick={(e) => addLike(e, blog)}
          >
            like
          </button>
        </p>
        {blog.user.username ? (
          <p>Added by {blog.user.username}</p>
        ) : (
          <p>Added by {user.username}</p>
        )}
        {(blog.user.username === user.username ||
          blog.user.username === undefined) && (
          <button onClick={() => removeBlog(blog)}>Remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
