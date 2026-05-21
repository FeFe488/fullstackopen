
const assert = require('node:assert')
const { test, after,beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')


const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('all notes are returned', async()=>{
//     const response= await api
//         .get('/api/notes')
//     assert.strictEqual(response.body.length, helper.initialNotes.length)
// })

// test('a specific note is within the returned notes', async () => {
//   const response = await api.get('/api/notes')

//   const contents = response.body.map(e => e.content)
//   assert.strictEqual(contents.includes('HTML is easy'), true)
// })


// test('a valid note can be added ', async () => {
//   const newNote = {
//     content: 'async/await simplifies making async calls',
//     important: true,
//   }

//   await api
//     .post('/api/notes')
//     .send(newNote)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const notesAtEnd = await helper.notesInDb()
//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

//   const contents = notesAtEnd.map(n => n.content)
//   assert(contents.includes('async/await simplifies making async calls'))
// })


// test('note without content is not added', async () => {
//   const newNote = {
//     important: true
//   }

//   await api
//     .post('/api/notes')
//     .send(newNote)
//     .expect(400)

//   const notesAtEnd = await helper.notesInDb()

//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
// })

// test('a specific note can be viewed', async () =>{
//   const notesAtStart = await helper.notesInDb()
//   const noteToView = notesAtStart[0]

//   const resultNote = await api
//     .get(`/api/notes/${noteToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   assert.deepStrictEqual(resultNote.body, noteToView) 
// })


// test ('a note can be deleted', async() =>{
//   const notesAtStart = await helper.notesInDb()
//   const noteToDelete = notesAtStart[0]

//   await api
//     .delete(`/api/notes/${noteToDelete.id}`)
//     .expect(204)

//     const notesAtEnd = await helper.notesInDb()

//     const ids  = notesAtEnd.map (n => n.id)
//     assert( !ids.includes(noteToDelete.id))

//     assert.strictEqual(notesAtEnd.length, helper.initialNotes.length -1)
// })


after(async () => {
  await mongoose.connection.close()
})


// const { test, describe } = require('node:test')
// const assert = require('node:assert')

// const listHelper = require('../utils/list_helper')

// test('dummy returns one test', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   assert.strictEqual(result, 1)
// })

// describe('total likes', () => {
//   const blogs = [
//     {
//       _id: '5a422a851b54a676234d17f7',
//       title: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: '5a422b891b54a676234d17fa',
//       title: 'First class tests',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: '5a422ba71b54a676234d17fb',
//       title: 'TDD harms architecture',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: '5a422bc61b54a676234d17fc',
//       title: 'Type wars',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//       likes: 2,
//       __v: 0,
//     },
//   ]

//   test('empty list is zero test', () => {
//     const result = listHelper.totalLikes([])
//     assert.strictEqual(result, 0)
//   })

//   test('total likes of all blogs test', () => {
//     const result = listHelper.totalLikes(blogs)
//     assert.strictEqual(result, 36)
//   })
// })

// describe('favorite blog', () => {
//   const blogs = [
//     {
//       _id: '5a422a851b54a676234d17f7',
//       title: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: '5a422b891b54a676234d17fa',
//       title: 'First class tests',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: '5a422ba71b54a676234d17fb',
//       title: 'TDD harms architecture',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: '5a422bc61b54a676234d17fc',
//       title: 'Type wars',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//       likes: 2,
//       __v: 0,
//     },
//   ]

//   test('favorite blog test', () => {
//     const result = listHelper.favoriteBlog(blogs)

//     assert.deepStrictEqual(result, {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0,
//     })
//   })
// })


// describe('most blogs', () => {
//   const blogs = [
//     {
//       _id: '5a422a851b54a676234d17f7',
//       title: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: '5a422b891b54a676234d17fa',
//       title: 'First class tests',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: '5a422ba71b54a676234d17fb',
//       title: 'TDD harms architecture',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: '5a422bc61b54a676234d17fc',
//       title: 'Type wars',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//       likes: 2,
//       __v: 0,
//     },
//   ]

//   test('author with most blogs test', () => {
//     const result = listHelper.mostBlogs(blogs)

//     assert.deepStrictEqual(result, {
//       author: 'Robert C. Martin',
//       blogs: 3,
//     })
//   })
// })

// describe('most likes', () => {
//   const blogs = [
//     {
//       _id: '5a422a851b54a676234d17f7',
//       title: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD808.html',
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: '5a422b891b54a676234d17fa',
//       title: 'First class tests',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: '5a422ba71b54a676234d17fb',
//       title: 'TDD harms architecture',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: '5a422bc61b54a676234d17fc',
//       title: 'Type wars',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//       likes: 2,
//       __v: 0,
//     },
//   ]

//   test('author with most likes test', () => {
//     const result = listHelper.mostLikes(blogs)

//     assert.deepStrictEqual(result, {
//       author: 'Edsger W. Dijkstra',
//       likes: 17,
//     })
//   })
// })