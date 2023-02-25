const dummy = (blogs) => {
    if(Array.isArray(blogs))
        return 1
}

const totalLikes = (blogs) => {
    const listofLikes = blogs.map(blog => blog.likes)
    let sum = 0;
    for (let i = 0; i < listofLikes.length; i++) 
    {
        sum += listofLikes[i];
    }
    return sum
}

const favouriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(m => m.likes))
    const fav = blogs.find(b => b.likes === maxLikes)
   // console.log(fav)
    return fav
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }