
const mongoose= require('mongoose')

mongoose.set('strictQuery',false)

const url= process.env.DBURI_PHONEBOOK

console.log("connecting to",url)

mongoose
    .connect(url)
    .then((result) => {
    console.log('connected to Mongo Phonebook DB')
  })
    .catch((error) => { 
    console.log('error connecting to Mongo phonebook DB:', error.message)
  })

const personSchema= new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})



module.exports= mongoose.model('Person', personSchema) 

