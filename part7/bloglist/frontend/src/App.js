import { useEffect, useRef } from "react"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import { useDispatch } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { checkUserFromLocalStorage } from "./reducers/userReducer"
import { useSelector } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(checkUserFromLocalStorage())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  return (
    <div>
      {user === null && (
        <LoginForm
          dispatch={dispatch}
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