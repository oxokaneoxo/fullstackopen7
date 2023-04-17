import "./blog.css"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  return (
    <div className="blog_container">
      <div className="basic_details">
        <Link to={`/blogs/${blog.id}`}>
          <span className="basic_title">{blog.title}</span>
          <span className="basic_author"> by {blog.author}</span>
        </Link>
      </div>
    </div>
  )
}

export default Blog
