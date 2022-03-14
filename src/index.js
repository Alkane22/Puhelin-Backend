require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const pNumber = require('./models/numbers')
const { response } = require('express')
const req = require('express/lib/request')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body));

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
  //res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  pNumber.findById(request.params.id)
    .then(number => {
      response.json(number)
    })
    .catch(e => {
      console.log(e)
      response.status(400).send({ error: 'malformatted id' })
    })

})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  try {
  pNumber.updateOne(
    { "_id": mongoose.Types.ObjectId(request.params.id) },
    { $set: { number: body.number } })
    .then(resp => {
      console.log(resp)
      response.status(204).end()
    })
  } catch (e){
    console.log(e)
      response.status(400).send({ error: 'malformatted id' })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  try {
    pNumber.deleteOne({ "_id": mongoose.Types.ObjectId(request.params.id) })
      .then(resp => {
        console.log(resp)
      })
  } catch (e) {
    console.log(e)
  }
  response.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const number = new pNumber({
    name: body.name,
    number: body.number,
  })

  number.save().then(response => {
    res.json(response)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})