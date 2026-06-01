import { useState } from "react"
import { Link, useParams } from "react-router-dom"

const Blog = ({ blog ,id,
  //  updateBlog, deleteBlog, user
  }) => {

  const id = useParams().id

  if(!blog){
    return null
  }
  
  const [visible,setVisible]=useState(false)


  const toggleVisbility = ()=>{
    setVisible(!visible)
  }

  // const handleLike = () =>{
  //   const updatedBlog = {
  //     title: blog.title,
  //     author: blog.author,
  //     url: blog.url,
  //     likes: blog.likes + 1
  //   }
  //   updateBlog(blog.id,updatedBlog)
  // }

  // const handleDeletion = () => {
  //    deleteBlog(blog.id)
  // }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const removeButtonStyle= {
  //   backgroundColor: 'red',
  //   border:'none'
  // }


  if(!visible){
  return(
  <div className="blog" style={blogStyle}>
    <div>
      <Link to={`/blog/${blog.id}`} onClick={toggleVisbility}>{blog.title} {blog.author}</Link>
      {/* <button onClick={toggleVisbility}> view</button> */}
    </div>
  </div>
  )
  }

  return(
    <div className="wholeBlock" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisbility}> view</button>
      </div>
      <div>{blog.url}</div>
      <div className="likes">{blog.likes} <button onClick={handleLike}>like</button></div>
      <div>{blog.user.username}</div>
      
      {user && blog.user && blog.user.username === user.username && (
        <div>
          <button style={removeButtonStyle} onClick={handleDeletion}>remove</button>
        </div>
      )}
    
    </div>
  )
}

export default Blog