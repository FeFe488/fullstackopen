import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import {
  Routes, Route, Link,
  useNavigate
} from 'react-router-dom'
// import BlogList from './components/BlogList'
import Blog from './components/Blog'
// import Footer from './components/Footer'
// import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
      )
  },[])
  
  const padding = {
    padding: 5
  }

  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()

    try{
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')

    
      setMessage({
        message: `successful login`,
        type: 'success'
      })

      setTimeout(()=>{
        setMessage(null)
      }, 5000)
    
    
    }catch {
      setMessage({
        message: `wrong username or password`,
        type: 'error'
      })

      setTimeout(()=>{
        setMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  return (
    <>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/login">login</Link>
       
      </div>

      <Routes>
        <Route path="/" element={
          <Blog blogs={blogs} />
        } />
        <Route path="/login" element={
          <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({target}) => setUsername(target.value)}
              handlePasswordChange={({target}) => setPassword(target.value)}
              handleSubmit={handleLogin}
          />
        } />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}


// const App = () => {
  
//   const [blogs, setBlogs] = useState([])
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [user,setUser] =  useState(null)
//   const [message,setMessage] = useState(null)
//   const blogFormRef = useRef()

//   useEffect(() => {
//     blogService.getAll().then(blogs =>
//       setBlogs( blogs )
//     )  
//   }, [])

//   useEffect(() => {
//     const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
//     if (loggedUserJson) {
//       const user = JSON.parse(loggedUserJson)
//       setUser(user)
//       blogService.setToken(user.token)
//     }
//   },[])

//   const handleLogin = async event => {
//     event.preventDefault()

//     try{
//       const user = await loginService.login({username, password})

//       window.localStorage.setItem(
//         'loggedBlogappUser', JSON.stringify(user)
//       )
//       blogService.setToken(user.token)
//       setUser(user)
//       setUsername('')
//       setPassword('')
    
//       setMessage({
//         message: `successful login`,
//         type: 'success'
//       })

//       setTimeout(()=>{
//         setMessage(null)
//       }, 5000)
    
    
//     }catch {
//       setMessage({
//         message: `wrong username or password`,
//         type: 'error'
//       })

//       setTimeout(()=>{
//         setMessage(null)
//       }, 5000)
//     }
//   }

//   const loginForm = () => (
//     <Togglable buttonLabel='login'>
//       <LoginForm
//         username={username}
//         password={password}
//         handleUsernameChange={({ target }) => setUsername(target.value)}
//         handlePasswordChange={({ target }) => setPassword(target.value)}
//         handleSubmit={handleLogin}
//       />
//     </Togglable>
//   )


//   const handleLogout = () => {
//     window.localStorage.removeItem('loggedBlogappUser')
//     blogService.setToken(null)
//     setUser(null)
//   }


//   const addBlog = async(blogObject)=> {
    
//     blogFormRef.current.toggleVisibility()

//     const returnedBlog = await blogService.create(blogObject)
//       setBlogs(blogs.concat({
//         ...returnedBlog,
//       user: user
//       }))

//       setMessage({
//         message: `a new blog "${returnedBlog.title}" by "${returnedBlog.author}" added`,
//         type: 'success'
//       })

//       setTimeout(()=>{
//         setMessage(null)
//       }, 5000)
//   }

//   const updateBlog = async(id,blogObject)=>{
//     const returnedBlog = await blogService.update(id,blogObject)
    
//     setBlogs(blogs.map(blog =>
//       blog.id !== id
//       ? blog
//       :{...returnedBlog, user: blog.user}
//     ))
//   }

//   const deleteBlog = async(id)=>{
//     await blogService.del(id)
//     setBlogs(blogs.filter(blog => blog.id != id))
//   }
  
//   const blogForm = () => (
//     <div>
//       <p>
//         {user.name} logged in <button onClick={handleLogout}>logout</button>
//       </p>

//     <Togglable buttonLabel="create new blog" ref={blogFormRef}>
//       <BlogForm
//       createBlog={addBlog}
//       />
//     </Togglable>


//     {[...blogs]
//       .sort((blog1,blog2) => blog2.likes -blog1.likes)
//       .map(blog=>(
//         <Blog 
//           key={blog.id}
//           blog={blog}
//           updateBlog={updateBlog}
//           deleteBlog={deleteBlog}
//           user={user}
//         />
//     ))}
    
//     </div>
//   )

  
  
//   return (
//       <>
//       <h1>Blogs application</h1>    
//       <div>
//       <Notification notification={message}/>
//       {!user && loginForm()}
//       {user && blogForm()}
//     </div>
//     </>
//     )
// }


export default App