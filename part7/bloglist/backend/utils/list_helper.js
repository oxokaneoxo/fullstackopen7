var _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return result;
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    const result = blogs.reduce((result, blog) => (result.likes > blog.likes ? result : blog))
    return {
        title: result.title,
        author: result.author,
        likes: result.likes
    };
}
const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    var results = _.chain(blogs)
        .groupBy("author")
        .map((value, author) => { return { author: author, blogs: value.length } })
        .value()
        .reduce((result, blog) => (result.blogs > blog.blogs ? result : blog))

    return results;
}
const mostLiked = (blogs) => {
    if (blogs.length === 0) return null;

    var results = _.chain(blogs)
        .groupBy("author")
        .map((value, author) => { return { author: author, likes: value.reduce((sum, blog) => sum + blog.likes, 0) } })
        .reduce((result, blog) => (result.likes > blog.likes ? result : blog))
        .value()

    return results;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked,
}