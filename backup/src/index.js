require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const pNumber = require('./models/numbers')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.send('<p>Phone book has info of ' + pNumber.length + ' people</p><p>' + new Date() + '</p>')
})

app.get('/api/persons', (req, res) => {
  pNumber.find({}).then(result => {
    res.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  pNumber.findById(request.params.id)
    .then(number => {
      response.json(number)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  pNumber.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNumber => {
      response.json(updatedNumber)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  try {
    pNumber.deleteOne({ '_id': mongoose.Types.ObjectId(request.params.id) })
      .then(resp => {
        console.log(resp)
        response.status(204).end()
      })
  } catch (e) {
    next(e)
  }
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const number = new pNumber({
    name: body.name,
    number: body.number,
  })

  number.save()
    .then(response => {
      res.json(response)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'BSONTypeError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})