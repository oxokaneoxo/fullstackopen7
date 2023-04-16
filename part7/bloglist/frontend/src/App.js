import { useState, useEffect, useRef } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import { useDispatch } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
      dispatch(setNotification(`${user.name} logged in`, 3))
    } catch (exception) {
      dispatch(setNotification(`Wrong details`, 3, "error"))
    }
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
    })
  }

  const addLike = (blogObject) => {
    blogService
      .update(blogObject.id, { ...blogObject, likes: blogObject.likes + 1 })
      .then((returnedBlog) => {
        setBlogs(
          blogs.map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog))
        )
      })
  }

  const deleteBlog = (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      blogService.remove(blogObject.id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
        
      })
    }
  }

  return (
    <div>
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}

      {user !== null && (
        <Blogs
          blogFormRef={blogFormRef}
          blogs={blogs}
          user={user}
          addBlog={addBlog}
          addLike={addLike}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App