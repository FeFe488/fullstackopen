

import { useState, useEffect } from 'react'


import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch,
  Navigate
} from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import {Container, AppBar, Toolbar,Button, Box, Typography} from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      console.log('wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    navigate('/')
  }

  const addBlog = async blogObject => {
    const returnedBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat({
      ...returnedBlog,
      user: user
    }))

    navigate('/')

    setNotification({ text: `Blog '${returnedBlog.title}' by  ${returnedBlog.author} added!`, type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const updateBlog = async (id, blogObject) => {
    const returnedBlog = await blogService.update(id, blogObject)

    setBlogs(blogs.map(blog =>
      blog.id !== id
        ? blog
        : { ...returnedBlog, user: blog.user }
    ))
  }

  const deleteBlog = async id => {
    await blogService.del(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
    navigate('/')
  }

  const padding = {
    padding: 5
  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }
  
  return (
    <Container>
      <AppBar position='static'>
        
        <Toolbar>
          <Typography
            sx={{
              fontWeight:'bold',
              fontSize:20,
            }}>
            Blog App
          </Typography>
          
          <Box sx={{marginLeft: 'auto'}}>

            <Button color="inherit" component={Link} to="/" sx={style} >
              blogs
            </Button>

            {user && (
              <Button color="inherit" component={Link} to="/create" sx={style}>
                new blog
              </Button>
            )}

            {user
              ? <Button onClick={handleLogout} color="inherit" sx={style}>
                  logout
                </Button>
              : <Button color="inherit" component={Link} to="/login" sx={style}>
                login
              </Button> 
            }
          </Box>

        </Toolbar>
      </AppBar>

      <Notification notification={notification}/>

      <Routes>
        <Route
          path="/"
          element={<BlogList blogs={blogs} />}
        />

        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              user={user}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          }
        />

        <Route
          path="/create"
          element={
            <BlogForm createBlog={addBlog}/>
          }
        />

        <Route
          path="/login"
          element={
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          }
        />
      </Routes>
    </Container>
  )
}

export default App