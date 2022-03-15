const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogArr) => {
  return blogArr.map(element => element.likes).reduce((prevVal, curVal) => prevVal + curVal)
}

const favoriteBlog = (blogArr) => {
  return blogArr.sort((a,b) => {
    return b.likes - a.likes
  })[0]
}

const mostBlogs = (blogArr) => {
  const result = {}

  for (var i = 0; i < blogArr.length;  i++){
    if(!result[blogArr[i].author]){
      result[blogArr[i].author] = 0
    }
    ++result[blogArr[i].author];
  }

  let author = ''
  let mostBlog = 0
  for (let prop in result){
    if(result[prop] > mostBlog){
      mostBlog = result[prop]
      author = prop
    }
  }

  const retObj = {
    author: author,
    blogs: mostBlog
  }
  return retObj
}

const mostLikes = (blogArr) => {
  const toBeModded  = blogArr.sort((a,b) => {
    return b.likes - a.likes
  })[0]

  const retObj = {
    author: toBeModded.author,
    likes: toBeModded.likes
  }

  return retObj
}


module.exports = {
  reverse,
  average,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}