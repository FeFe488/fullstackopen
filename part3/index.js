
const express=require('express')
const app= express()
const morgan= require('morgan')
app.use(express.json())
const cors= require('cors')
app.use(cors())

morgan.token('body',(req,res)=>{
    if(req.method==='POST'){
        return JSON.stringify(req.body)
    }

})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))




let entries=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
    res.json(entries)
})

app.get('/info',(req,res)=>{

    const id= entries.length
    const date= new Date()
    res.send(`<p> Phonebook has info for ${id} people</p>
        <p>${date}</p>`)
})

app.get('/api/persons/:id',(req,res)=>{
    const id= req.params.id
    const person= entries.find (entry=> entry.id===id)
    
    if (person){
        res.json(person)
    }else {
        res.status(404).end()}
})


app.delete('/api/persons/:id',(req,res)=>{
    const id= req.params.id
    entries= entries.filter(entry=> entry.id!== id)  
    res.status(204).end()
    console.log (`is deleted`)
})



const generateID=()=>{
return Math.floor(Math.random()*1000)}

app.post('/api/persons',(req,res)=>{
    const body=req.body

    if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
    }

    if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
    }

    const nameExists=entries.find(entry=>entry.name===body.name)
    if (nameExists){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
   
    
   const entry={
        id: String(generateID()),
        name: body.name,
        number: body.number,
    }

    entries= entries.concat(entry)
    res.json(entry)
})


const PORT=3001
app.listen(PORT,()=>{
    console.log (`server running on port ${PORT}`)
})



