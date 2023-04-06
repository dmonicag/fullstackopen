import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Underrated React Hooks you’re missing out on',
    author: 'Chiamaka Umeh',
    url: 'https://blog.logrocket.com/underrated-react-hooks-youre-missing-out-on/',
    likes: 0,
    user: {
      user: 'mock',
      username: 'Mock',
    }
  }
  const user = {
    user: 'mock',
    username: 'mock',
  }
  const mockLike = jest.fn()
  const mockDelete = jest.fn()

  test('renders component Blog', () => {
    const { container } = render(<Blog blog={blog} user={user} addLike={mockLike} handleDelete={mockDelete}/>)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Underrated React Hooks you’re missing out on')
    expect(div).toHaveTextContent('Chiamaka Umeh')
    expect(div).not.toHaveTextContent('https://blog.logrocket.com/underrated-react-hooks-youre-missing-out-on/')
    expect(div).not.toHaveTextContent('Likes')
  })

  test('likes and url shown when button clicked', async () => {
    const { container } = render(<Blog blog={blog} user={user} addLike={mockLike} handleDelete={mockDelete}/>)
    const div = container.querySelector('.blog_detail')

    const user_event = userEvent.setup()
    const button = screen.getByText('View')
    await user_event.click(button)

    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('Url')
    expect(div).toHaveTextContent('Likes:')
  })

  /*
  test('event handler called twice when like button is pressed twice', async () => {

    render(<Blog blog={blog} user={user} addLike={mockLike} handleDelete={mockDelete}/>)

    const user_event = userEvent.setup()
    const element = screen.getByText('like')

    await user_event.click(element)
    screen.debug()

    expect(mockLike.mock.calls).toHaveLength(1)
  })
  */
})


