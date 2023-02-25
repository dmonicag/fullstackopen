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

module.exports = {
    dummy,
    totalLikes
  }