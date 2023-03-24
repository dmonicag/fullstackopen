import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm/> calls event handler with right details', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={addBlog} />)

  const input_title = screen.getByPlaceholderText('enter title')
  const input_author = screen.getByPlaceholderText('enter author')
  const input_url = screen.getByPlaceholderText('enter url')
  const submitButton = screen.getByText('Add Blog')

  await user.type(input_title, 'title')
  await user.type(input_author, 'author')
  await user.type(input_url, 'url')
  await user.click(submitButton)

  expect(addBlog.mock.calls[0][0].title).toBe('title')
  expect(addBlog.mock.calls[0][0].author).toBe('author')
  expect(addBlog.mock.calls[0][0].url).toBe('url')
  expect(addBlog.mock.calls).toHaveLength(1)
})

