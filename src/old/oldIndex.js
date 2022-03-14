const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
  {
    name: "Test Subject",
    number: "040-123456",
    id: 5
  }
]



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req,res) => {
  res.send('<p>Phone book has info of ' + persons.length + ' people</p><p>'+ new Date() +'</p>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  const person = persons.find(person => {
    //console.log(person.id, typeof person.id, id, typeof id)
    return person.id === parseInt(id) //parseInt ei välttämättä ole ok sillä tää toimii nyt esim /api/persons/1asdasdasdasd :D
  })

  if (person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  if(persons.some(person => person.name === body.name)){
    return res.status(400).json({
      error: 'Phone book already contains ' + body.name
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id:  generateId()
  }

  persons = persons.concat(person)

  //console.log(person)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})