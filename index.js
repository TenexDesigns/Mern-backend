const express = require('express')
const docenv = require('dotenv')
const mongoose = require('mongoose')
const todos = require('./routes/todos')
const sighnup = require('./routes/sighnup')
const sighnin = require('./routes/sighin')


const cors = require('cors')
const Todo= require ('./modules/todo')

docenv.config()
const app = express()

app.use(cors()) 
app.use(express.json())

app.use("/api/todos",todos)
app.use('/api/sighnup',sighnup)
app.use('/api/sighnin',sighnin)

app.get('/',(req,res)=>{
    res.send("Hellow world and welocome to todays work experience we have a lot to do")

})

console.log(Todo)

const connection_string = process.env.CONNECTION_STRING 
const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Servr up and running ooon port ${port}`)
})

mongoose.connect(connection_string ,{})
.then(()=>{
    console.log("connection succesfull")
})
.catch((error)=>{console.error("Mongo db connection failed:",error.message)})