const nRouter = require('express').Router()
const pNumber = require('../models/numbers')
const mongoose = require('mongoose')
const logger = require('../utils/logger')


nRouter.get('/info', (req, res) => {
  res.send('<p>Phone book has info of ' + pNumber.length + ' people</p><p>' + new Date() + '</p>')
})

nRouter.get('/', (req, res) => {
  pNumber.find({}).then(result => {
    res.json(result)
  })
})

nRouter.get('/:id', (request, response, next) => {
  pNumber.findById(request.params.id)
    .then(number => {
      response.json(number)
    })
    .catch(error => next(error))

})

nRouter.put('/:id', (request, response, next) => {
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

nRouter.delete('/:id', (request, response, next) => {
  try {
    pNumber.deleteOne({ '_id': mongoose.Types.ObjectId(request.params.id) })
      .then(resp => {
        logger.info(resp)
        response.status(204).end()
      })
  } catch (e) {
    next(e)
  }
})

nRouter.post('/', (req, res, next) => {
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

module.exports = nRouter