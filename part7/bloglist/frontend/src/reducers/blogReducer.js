import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        addLike(state, action) {
            const updatedBlog = action.payload
            return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }
    }
})

export const { appendBlog, setBlogs, addLike, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch(appendBlog(newBlog))
        dispatch(setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 3))
    }
}

export const likeBlog = (blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(blogObject.id, { ...blogObject, likes: blogObject.likes + 1 })
        dispatch(addLike(updatedBlog))
        dispatch(setNotification(`You liked ${updatedBlog.title} by ${updatedBlog.author}`, 3))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
        dispatch(setNotification(`Blog deleted`, 3))
    }
}

export default blogSlice.reducer