const blogsRouter = require('express').Router()
const Blog = require("../models/blog")

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const { title, author, url, likes } = request.body
    const blog = new Blog({
        title,
        author: author ? author : 'Unkown',
        url,
        likes: likes ? likes : 0
    })

    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'operation not permitted' })
    }

    blog.user = user._id

    const createdBlog = await blog.save()

    user.blogs = user.blogs.concat(createdBlog._id)
    await user.save()

    response.status(201).json(createdBlog)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    
    if (!user || blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'operation not permitted' })
    }

    user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString())

    await user.save()
    await blog.remove()

    response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes,
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter;