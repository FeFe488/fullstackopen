

import Blog from './Blog'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>

      {[...blogs]
        .sort((blog1, blog2) => blog2.likes - blog1.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  )
}

export default BlogList


// const BlogList = () => {

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [user,setUser] =  useState(null)
//   const [message,setMessage] = useState(null)
//   const blogFormRef = useRef()

// //   useEffect(() => {
// //     const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
// //     if (loggedUserJson) {
// //       const user = JSON.parse(loggedUserJson)
// //       setUser(user)
// //       blogService.setToken(user.token)
// //     }
// //   },[])

// //   const handleLogin = async event => {
// //     event.preventDefault()

// //     try{
// //       const user = await loginService.login({username, password})

// //       window.localStorage.setItem(
// //         'loggedBlogappUser', JSON.stringify(user)
// //       )
// //       blogService.setToken(user.token)
// //       setUser(user)
// //       setUsername('')
// //       setPassword('')
    
// //       setMessage({
// //         message: `successful login`,
// //         type: 'success'
// //       })

// //       setTimeout(()=>{
// //         setMessage(null)
// //       }, 5000)
    
    
// //     }catch {
// //       setMessage({
// //         message: `wrong username or password`,
// //         type: 'error'
// //       })

// //       setTimeout(()=>{
// //         setMessage(null)
// //       }, 5000)
// //     }
// //   }



// //   const handleLogout = () => {
// //     window.localStorage.removeItem('loggedBlogappUser')
// //     blogService.setToken(null)
// //     setUser(null)
// //   }


// //   const addBlog = async(blogObject)=> {
    
// //     blogFormRef.current.toggleVisibility()

// //     const returnedBlog = await blogService.create(blogObject)
// //       setBlogs(blogs.concat({
// //         ...returnedBlog,
// //       user: user
// //       }))

// //       setMessage({
// //         message: `a new blog "${returnedBlog.title}" by "${returnedBlog.author}" added`,
// //         type: 'success'
// //       })

// //       setTimeout(()=>{
// //         setMessage(null)
// //       }, 5000)
// //   }

// //   const updateBlog = async(id,blogObject)=>{
// //     const returnedBlog = await blogService.update(id,blogObject)
    
// //     setBlogs(blogs.map(blog =>
// //       blog.id !== id
// //       ? blog
// //       :{...returnedBlog, user: blog.user}
// //     ))
// //   }

// //   const deleteBlog = async(id)=>{
// //     await blogService.del(id)
// //     setBlogs(blogs.filter(blog => blog.id != id))
// //   }
  
//   const blogForm = () => (
//     <div>
//       {/* <p>
//         {user.name} logged in <button onClick={handleLogout}>logout</button>
//       </p> */}

//     {/* <Togglable buttonLabel="create new blog" ref={blogFormRef}>
//       <BlogForm
//       createBlog={addBlog}
//       />
//     </Togglable> */}
// {/* 

//     {[...blogs]
//       .sort((blog1,blog2) => blog2.likes -blog1.likes)
//       .map(blog=>(
//         <Blog 
//           key={blog.id}
//           blog={blog}
//         //   updateBlog={updateBlog}
//         //   deleteBlog={deleteBlog}
//           user={user}
//         />
//     ))}
    
//     </div>
//   ) */}

  
  
//   return (
//       <>
//       <h1>Blogs application</h1>    
//       <div>
//       <Notification notification={message}/>
      
//        {/* blogForm() */}
//     </div>
//     </>
//     )
// }

// export default {BlogList}


