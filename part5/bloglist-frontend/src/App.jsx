import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm' 
import Togglable from './components/Togglable'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] =  useState(null)
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [message,setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

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

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )


  const handleLogout = ()=>{
    setUser(window.localStorage.removeItem('loggedBlogappUser'))
  }


  const addBlog = async(blogObjekt)=> {
    // event.preventDefault()
      
    // const blogObject = {
    //   title: title,
    //   author: author,
    //   url: url
    // }

    const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      // setTitle('')
      // setAuthor('')
      // setUrl('')

    setMessage({
      message: `a new blog "${returnedBlog.title}" by "${returnedBlog.author}" added`,
      type: 'success'
    })

      setTimeout(()=>{
        setMessage(null)
      }, 5000)
  }
  
  const blogForm = () => {
    <Togglable buttonLabel="create">
      <BlogForm
      createBlog={addBlog}
      />
    </Togglable>
  }

  
  // const blogForm = () => (
      
  // <div>
        
  //         <p>{user.name} logged in</p>
  //         <button onClick={handleLogout}>logout</button>
          
          
  //         <form onSubmit={addBlog}>
  //           <h1>create new</h1>
  //           <div>
  //           <label>
  //             title:
  //             <input
  //             type='title'
  //             value={title}
  //             onChange={({target}) => setTitle(target.value)}
  //             />
  //           </label>
  //           </div>
  //           <div>
  //           <label>
  //             author:
  //             <input
  //             type='author'
  //             value={author}
  //             onChange={({target}) => setAuthor(target.value)}
  //             />
  //           </label>
  //           </div>
  //           <div>
  //           <label>
  //             url:
  //             <input
  //             type='url'
  //             value={url}
  //             onChange={({target}) => setUrl(target.value)}
  //             />
  //           </label>
  //           </div>
  //           <button type="submit">confirm</button>
  //         </form>
  //         {blogs.map(blog =>(
  //             <Blog key={blog.id} blog={blog} />
  //           ))}  
  //     </div>
  // )



  return (
      <>
      <h1>Blogs application</h1>    
      <div>
      <Notification notification={message}/>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
    </>
    )
}



export default App