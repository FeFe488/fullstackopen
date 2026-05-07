const mongoose= require('mongoose')

if (process.argv.length<3){
    console.log('give password as argument')
    process.exit(1)
}

const password= process.argv[2]

const url= `mongodb+srv://FeFe488:${password}@cluster-phonebook.ka1wpqn.mongodb.net/phonebookApp?appName=Cluster-phonebook`

mongoose.set('strictQuery',false)
mongoose.connect(url, {family:4})

const personSchema= new mongoose.Schema({
    name: String,
    number: String,
})

const Person= mongoose.model('Person', personSchema) 

if (process.argv.length===3){
    console.log('phonebook:')
    Person.find({}).then(result=>{
        result.forEach(person=>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length===5){
    const name= process.argv[3]
    const number= process.argv[4]

    const person= new Person({
        name: name,
        number: number,
    })

    person.save().then(respond=>{
        console.log(console.log(`added ${name} number ${number} to phonebook`))
        mongoose.connection.close()
    })
 
}

