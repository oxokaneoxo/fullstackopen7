import React from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleBlogCreation = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    dispatch(createBlog({ title, author, url, likes: 0 }))
    event.target.title.value = ""
    event.target.author.value = ""
    event.target.url.value = ""
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            type="text"
            name="title"
            id="blog_title"
            placeholder="add title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            id="blog_author"
            placeholder="add author"
          />
        </div>
        <div>
          url:
          <input type="text" name="url" id="blog_url" placeholder="add url" />
        </div>
        <button
          id="blog_submit-button"
          data-testid="submit_button"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  )
}

export default BlogForm
