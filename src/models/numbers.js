
const mongoose = require('mongoose')

/*
const password = process.argv[2]
const url =
    `mongodb+srv://Aleksei:${password}@cluster0.vl6al.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
*/
const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const numberSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(v){
                return /\d{2,3}-\d{7}/.test(v)
            }
        },
        required: true
    },
})

numberSchema.set('toJSON', {
    transform: (document, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

const pNumber = mongoose.model('Number', numberSchema)

module.exports = mongoose.model('Number', numberSchema)