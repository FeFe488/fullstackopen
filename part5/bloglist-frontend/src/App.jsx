

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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>

        {user && (
          <Link style={padding} to="/create">new blog</Link>
        )}

        {user
          ? <button onClick={handleLogout}>logout</button>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

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
    </div>
  )
}

export default App