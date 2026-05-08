
require('dotenv').config()
const express=require('express')
const Person= require('./models/person')

const app=express()
app.use(express.json())

let entries=[]

const requestLogger= (req,res,next)=>{
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')        
    next()    
}

app.use (requestLogger)
app.use(express.static('dist'))


app.get ('/', (req, res)=>{
        res.send('<h1>hello phonebook</h1>')
    })
    


app.get ('/api/persons', (req, res)=>{
    Person.find({}).then((entires)=>{
        res.json(entires)
    })
})

    

app.get('/api/persons/:id', (req,res) => {
    const id=req.params.id
    Person.findById(req.params.id).then((entry)=>{
        console.log("found entry with:",id)
        res.json(entry)
    })
})

app.post('/api/persons' ,(req,res)=>{
    const body= req.body

    if(!body.name){
        return res.status(400).json({error: 'name missing'})
    }

    if(!body.number){
        return res.status(400).json({error: 'number missing'})
    }


    const entry= new Person({
        name: body.name,
        number: body.number,
    })

    entry.save().then((savedEntry)=>{
        res.json(savedEntry)
    })
})

app.delete('/api/persons/:id',(req,res) =>{
    const id= req.params.id
    entry= entires.filter((entry)=> entry.id!==id)

    res.status(204).end()
})

const unknownEndpoint= (req,res)=> {
    res.status(404).send({error: 'unkown endpoint'})
}

app.use(unknownEndpoint)

const PORT= process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})



// // const { models } = require('mongoose')
// // const app= express()
// // const morgan= require('morgan')
// // app.use(express.json())
// // //const cors= require('cors')
// // //app.use(cors())
// // app.use(express.static('dist'))

// // const Person= import('/models/person')

// // morgan.token('body',(req,res)=>{
// //     if(req.method==='POST'){
// //         return JSON.stringify(req.body)
// //     }

// // })

// // app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))




// // let entries=[
// //     { 
// //       "id": "1",
// //       "name": "Arto Hellas", 
// //       "number": "040-123456"
// //     },
// //     { 
// //       "id": "2",
// //       "name": "Ada Lovelace", 
// //       "number": "39-44-5323523"
// //     },
// //     { 
// //       "id": "3",
// //       "name": "Dan Abramov", 
// //       "number": "12-43-234345"
// //     },
// //     { 
// //       "id": "4",
// //       "name": "Mary Poppendieck", 
// //       "number": "39-23-6423122"
// //     }
// // ]

// app.get('/api/persons',(req,res)=>{
//     Person.find({}).then(person=>{
//         res.json(person)
//     })
// })


// app.get('/info',(req,res)=>{

//     const id= entries.length
//     const date= new Date()
//     res.send(`<p> Phonebook has info for ${id} people</p>
//         <p>${date}</p>`)
// })

// app.get('/api/persons/:id',(req,res)=>{
//     Person.findById(request.parms.id).then(person=>{
//         res.json(person)
//     })
    
//     // if (person){
//     //     res.json(person)
//     // }else {
//     //     res.status(404).end()}
// })


// app.delete('/api/persons/:id',(req,res)=>{
//     const id= req.params.id
//     entries= entries.filter(entry=> entry.id!== id)  
//     res.status(204).end()
//     console.log (`is deleted`)
// })



// const generateID=()=>{
// return Math.floor(Math.random()*1000)}

// app.post('/api/persons',(req,res)=>{
//     const body=req.body

//     if (!body.name) {
//     return res.status(400).json({ 
//       error: 'name missing' 
//     })
//     }

//     if (!body.number) {
//     return res.status(400).json({ 
//       error: 'number missing' 
//     })
//     }

//     const nameExists=entries.find(entry=>entry.name===body.name)
//     if (nameExists){
//         return res.status(400).json({
//             error: 'name must be unique'
//         })
//     }
   
    
//    const entry={
//         id: String(generateID()),
//         name: body.name,
//         number: body.number,
//     }

//     entries= entries.concat(entry)
//     res.json(entry)
// })


// const PORT= process.env.PORT
// app.listen(PORT,()=>{
//     console.log (`server running on port ${PORT}`)
// })



