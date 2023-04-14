import React from 'react'
import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = (event) => {
    event.preventDefault()

    addBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            id='blog_title'
            placeholder='add title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            id='blog_author'
            placeholder='add author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            id='blog_url'
            placeholder='add url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='blog_submit-button' data-testid="submit_button" type="submit">submit</button>
      </form>
    </div>
  )
}

export default BlogForm