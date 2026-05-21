// const dummy = (blogs) => {
//   return 1
// }

// const totalLikes = (blogs) => {
//   return blogs.reduce((sum, blog) => sum + blog.likes, 0)
// }

// const favoriteBlog = (blogs)=>{
  
//   return blogs.reduce((favorite, blog)=>{
//     return blog.likes> favorite.likes? blog: favorite
//   })
// }

// const mostBlogs = blogs => {
//   const blogCounts = blogs.reduce((counts, blog) => {
//     counts[blog.author] = (counts[blog.author] || 0) + 1
//     return counts
//   }, {})

//   const authors = Object.keys(blogCounts)

//   return authors.reduce((topAuthor, author) => {
//     return blogCounts[author] > topAuthor.blogs
//       ? { author: author, blogs: blogCounts[author] }
//       : topAuthor
//   }, { author: authors[0], blogs: blogCounts[authors[0]] })
// }

// const mostLikes = blogs => {
//   const likesByAuthor = blogs.reduce((authors, blog) => {
//     authors[blog.author] = (authors[blog.author] || 0) + blog.likes
//     return authors
//   }, {})

//   const authors = Object.keys(likesByAuthor)

//   return authors.reduce((topAuthor, author) => {
//     return likesByAuthor[author] > topAuthor.likes
//       ? { author: author, likes: likesByAuthor[author] }
//       : topAuthor
//   }, { author: authors[0], likes: likesByAuthor[authors[0]] })
// }

// module.exports = {
//   dummy,
//   totalLikes,
//   favoriteBlog,
//   mostBlogs,
//   mostLikes
// }