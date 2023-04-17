import { useEffect, useRef } from "react"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import { useDispatch } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { checkUserFromLocalStorage } from "./reducers/userReducer"
import { useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import Users from "./components/Users"
import User from "./components/User"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(checkUserFromLocalStorage())
  }, [dispatch])

  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  return (
    <div>
      {user === null && <LoginForm dispatch={dispatch} />}

      {user !== null && (
        <div>
          <div className="navbar">
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
          </div>
          <Routes>
            <Route
              path="/"
              element={<Blogs blogFormRef={blogFormRef} user={user} />}
            />
            <Route path="/users" element={<Users user={user} />} />
            <Route path="/users/:id" element={<User user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
