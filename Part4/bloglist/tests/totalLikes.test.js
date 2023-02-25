const { totalLikes } = require('../utils/list_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const oneBlog = [{
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }]
    const result = totalLikes(oneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
      "title": "Error handling in React 16",
      "author": "Dan Abramov",
      "url": "https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html",
      "likes": 15,
      "id": "63f97aac28dd32a5c8c57d12"
      },
      {
      "title": "What’s New In Node Js 18?",
      "author": "Mrinal Saraswat",
      "url": "https://www.bacancytechnology.com/blog/whats-new-in-node-js-18",
      "likes": 10,
      "id": "63f97c6128dd32a5c8c57d14"
      },
      {
      "title": "REST API Best Practices – REST Endpoint Design Examples",
      "author": "Kolade Chris",
      "url": "https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/",
      "likes": 14,
      "id": "63f981f68f06536c2a0c0641"
      }
    ]
    const result = totalLikes(blogs)
    expect(result).toBe(39)
  })
})