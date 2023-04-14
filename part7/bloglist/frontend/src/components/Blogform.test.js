import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('calls event handler with correct details when a new blog is created', async () => {

        const blogData = {
            title: 'Hello',
            author: 'Jest',
            url: 'https://www.google.com',
        }
        const testSubmit = jest.fn()
        render(<BlogForm addBlog={testSubmit} />)

        const titleInput = screen.getByPlaceholderText('add title')
        const authorInput = screen.getByPlaceholderText('add author')
        const urlInput = screen.getByPlaceholderText('add url')

        const submitButton = screen.getByText("submit")

        const user = userEvent.setup()

        await user.type(titleInput, blogData.title)
        await user.type(authorInput, blogData.author)
        await user.type(urlInput, blogData.url)
        await user.click(submitButton)

        expect(testSubmit.mock.calls).toHaveLength(1)
        expect(testSubmit.mock.calls[0][0]).toMatchObject(blogData)
    })
})