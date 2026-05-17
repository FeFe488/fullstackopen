
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
    name:{
      type: String,
      minlength: 3,
      required: true
    } ,
    number:{
      type: String,
      minlength: [8, 'min length of number is 8 characters'],
      required: [true, 'phonenumber required'],
      validate:{
        validator: function(v){
          return/^\d{2,3}-\d+$/.test(v);
        },
        message: props => `${props.value} not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXX`
      }
    }
  })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})



module.exports= mongoose.model('Person', personSchema) 

