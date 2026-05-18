require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

// const requestLogger = (req, res, next) => {
//   console.log('Method:', req.method)
//   console.log('Path:  ', req.path)
//   console.log('Body:  ', req.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>hello phonebook</h1>')
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p> ${date}</p>
        `)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((entires) => {
    res.json(entires)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((entry) => {
      if (!entry) {
        return res.status(404).send('person with that id not found')
      }
      res.json(entry)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return res.status(400).json({ error: 'name must be unique' })
      }

      const entry = new Person({
        name: body.name,
        number: body.number,
      })

      return entry.save()
        .then((savedEntry) => {
          res.json(savedEntry)
        })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findById(req.params.id)
    .then(entry => {
      if (!entry) {
        return res.status(404).end()
      }

      entry.name = name
      entry.number = number

      return entry.save()
        .then((updatedEntry) => {
          res.json(updatedEntry)
        })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})