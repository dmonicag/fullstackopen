import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Underrated React Hooks you’re missing out on',
  author: 'Chiamaka Umeh',
  url: 'https://blog.logrocket.com/underrated-react-hooks-youre-missing-out-on/',
  user: {
    user: 'mock',
    username: 'Mock'
  }
}

const user = {
  user: 'mock',
  username: 'mock'
}

test('renders component Blog', () => {
  const { container } = render(<Blog blog={blog} user={user} />)
  const div = container.querySelector('.blog')
  screen.debug()
  expect(div).toHaveTextContent('Underrated React Hooks you’re missing out on')
  expect(div).toHaveTextContent('Chiamaka Umeh')
  expect(div).not.toHaveTextContent('https://blog.logrocket.com/underrated-react-hooks-youre-missing-out-on/')
  expect(div).not.toHaveTextContent('Likes')
})

test('likes and url shown when button clicked', async () => {
  const { container } = render(<Blog blog={blog} user={user} />)
  const div = container.querySelector('.blog_detail')

  const user_event = userEvent.setup()
  const button = screen.getByText('View')
  await user_event.click(button)

  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('Url')
  expect(div).toHaveTextContent('Likes:')
})

