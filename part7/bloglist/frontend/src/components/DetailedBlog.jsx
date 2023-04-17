import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from "react-redux"
import { likeBlog } from "../reducers/blogReducer"

const DetailedBlog = () => {
    const [blogs, setBlogs] = useState(null)
    const id = useParams().id
    useEffect(() => {
        blogService.getAll()
            .then((blog) => {
                setBlogs(blog)
            })
    }, [])
    const dispatch = useDispatch()

    const addLike = (blog) => {
        dispatch(likeBlog(blog))
        window.location.reload()
    }

    if (blogs === null) {
        return (
            <div>Loading...</div>
        )
    }

    const blog = blogs.find((blog) => blog.id === id)
    return (
        <div>
            <h2>{blog.title}</h2>
            <p><a href={blog.url}>{blog.url}</a></p>
            <p>
                Likes: {blog.likes}{" "}
                <button
                    className="like_button"
                    data-testid="like_button"
                    onClick={() => addLike(blog)}
                >
                    like
                </button>
            </p>
            <p>Added by {blog.user.name}</p>
        </div>
    )
}

export default DetailedBlog