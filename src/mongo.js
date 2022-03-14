const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Aleksei:${password}@cluster0.vl6al.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)


const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Number = mongoose.model('Number', numberSchema)

if(process.argv.length > 3){
    const number = new Number({
        name: process.argv[3],
        number: process.argv[4],
    })

    number.save().then(result => {
        console.log('added ' + number['name'] + ' number ' + number['number'] + ' to phone book')
        mongoose.connection.close()
    })
} else {
    Number.find({}).then(result => {
        result.forEach(number => {
            console.log(number['name'] + ' ' + number['number'])
        })
        mongoose.connection.close()
    })
}

//mongoose.connection.close()

/*
for(const args in process.argv){
    console.log(process.argv[args])
}
*/

/*
Number.find({}).then(result => {
    result.forEach(number => {
        console.log(number)
    })
    mongoose.connection.close()
})

const number = new Number({
  name: 'Antti Andersson',
  number: '040-7812533',
})

number.save().then(result => {
  console.log('Number saved!')
  mongoose.connection.close()
})

//moi
*/