import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        }
    }
})

export const { setUser, removeUser } = loginSlice.actions

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
            blogService.setToken(user.token)

            dispatch(setUser(user))
            dispatch(setNotification(`${user.name} logged in`, 3))
        } catch (exception) {
            dispatch(setNotification(`Wrong details`, 3, "error"))
        }
    }
}

export const checkUserFromLocalStorage = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem("loggedBlogappUser")
        dispatch(logoutUser())
    }
}

export default loginSlice.reducer