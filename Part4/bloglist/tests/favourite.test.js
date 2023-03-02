const { favouriteBlog } = require('../utils/list_helper')

describe('favourite blog', () => {
  const blogs = [{
    'title': 'Error handling in React 16',
    'author': 'Dan Abramov',
    'url': 'https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html',
    'likes': 15,
    'id': '63f97aac28dd32a5c8c57d12'
  },
  {
    'title': 'What’s New In Node Js 18?',
    'author': 'Mrinal Saraswat',
    'url': 'https://www.bacancytechnology.com/blog/whats-new-in-node-js-18',
    'likes': 10,
    'id': '63f97c6128dd32a5c8c57d14'
  },
  {
    'title': 'REST API Best Practices – REST Endpoint Design Examples',
    'author': 'Kolade Chris',
    'url': 'https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/',
    'likes': 14,
    'id': '63f981f68f06536c2a0c0641'
  }]

  test('with most likes from', () => {
    const result = favouriteBlog(blogs)
    expect(result.likes).toEqual(15)
  })

  test('with one blog', () => {
    const blogs = [{
      'title': 'Error handling in React 16',
      'author': 'Dan Abramov',
      'url': 'https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html',
      'likes': 15,
      'id': '63f97aac28dd32a5c8c57d12'
    }]
    const result = favouriteBlog(blogs)
    expect(result.likes).toEqual(15)
  })
})
