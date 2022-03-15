const mostBlogs = require('../utils/for_testing').mostBlogs

describe('most liked', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676334d17f8',
        title: 'Go To Statement Considered Good',
        author: 'bro W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422aa71b24a676334d17f8',
        title: 'Go To hell',
        author: 'bo W. dona',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 9,
        __v: 0
      },
      {
        _id: '5a422aa71b29a676334d17f8',
        title: 'Go To heaven',
        author: 'bo W. dona',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0
      },
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = mostBlogs(listWithOneBlog)
      compObj = {
        author: "bo W. dona",
        blogs: 2
      }
      expect(result).toEqual(compObj)
    })
  })