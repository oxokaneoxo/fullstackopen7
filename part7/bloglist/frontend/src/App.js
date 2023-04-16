import { useState, useEffect, useRef } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import { useDispatch } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"

const App = () => {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
          user={user}
        />
      )}
    </div>
  )
}

export default App