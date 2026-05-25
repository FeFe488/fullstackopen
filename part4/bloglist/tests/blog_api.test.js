
const assert = require('node:assert')
const { test, after,beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)

let token 

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    

    const user = new User({
      username: "root",
      name: 'testuser',
      passwordHash: 'notneeded',
    })

    const savedUser = await user.save()

    token = jwt.sign(
      {username: savedUser.username, id: savedUser._id},
      process.env.SECRET
    )
    
    const blogsWithUser = helper.initialBlogs.map(blog => ({
    ...blog,
    user: savedUser._id,
  }))

  await Blog.insertMany(blogsWithUser)

  })

describe('get blogs tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async()=>{
      const response= await api
          .get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('is called id not _id test',async()=>{
    const response = await api
      .get('/api/blogs/')

      response.body.forEach(blog => {
        assert(blog.id)
        assert.strictEqual(blog._id, undefined)
      })
  })
})

describe('adding of a blog tests', ()=> {
  test( ' correctly added to db', async ()=>{

    const newBlog = {
      title: 'async/await post test',
      author: 'Test Author',
      url: 'test.com',
      likes: 1,
    }

    await api
      .post ('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAfter= await helper.blogsInDb()

    assert.strictEqual( blogsAfter.length, helper.initialBlogs.length +1)

    const titles= blogsAfter.map( blog => blog.title)
    assert(titles.includes ('async/await post test'))
  })

  test('adding a blog fails with status code 401 if token is not provided', async () => {
  const newBlog = {
    title: 'blog without token',
    author: 'Test Author',
    url: 'test.com',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAfter = await helper.blogsInDb()

  assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
  })

  test('like default 0? test', async ()=>{
    const newBlog= {
      title: 'new blog without likes',
      author: 'test author',
      url: 'no url'
    }

    const blogAfter = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(blogAfter.body.likes, 0)
  })


  test('url missing?', async()=> {
    const newBlog= {
      title: 'new blog without likes',
      author: 'test author',
    }

    const blogAfter = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('title missing?', async()=> {
    const newBlog= {
      author: 'test author',
      url: 'test.com',
    }

    const blogAfter = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })
})

describe('deletion of a blog tests', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

describe('updating of a blog tests', ()=>{
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)

    const blogsAtEnd = await helper.blogsInDb()
    const changedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    assert.strictEqual(changedBlog.likes, blogToUpdate.likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
