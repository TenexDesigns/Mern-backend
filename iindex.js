const express = require('express')
const docenv = require('dotenv') // enables us to run .env 
docenv.config() //instanciet dot env like this ,so as to be able to use process.env

const mongoose = require('mongoose')
const todos = require('./routes/todos')
const sighnup = require('./routes/sighnup')
const sighnin = require('./routes/sighin')


const cors = require('cors')  // cross origin resouce sharing 
const Todo= require ('./modules/todo')

const app = express()

// Middle ware -is code that gets executed betweeen our request(req)and response(res) i.e request from browes and response from server 
//The middle ware is instancieted using the app.use() and put betweeen the paranthesis
//The middleware has three ardumments,request,response and next.   After excuting code in mioddleware ,alwares instanciest the next function in order to move on in code excution


//This middle ware can be a function e.g This function between the app.use paranthesis is executed every time there is a request ,response cycle
//    app.use((req, res, next) => {
//        console.log('Time:', Date.now())
//          next()                           //always invote next for code to  be excuted
//       })

//This middleware is instanceated every time thre request is throught the indicated path of 'user/:id'
//app.use('/user/:id', (req, res, next) => {
//    console.log('Request Type:', req.method)
//   next()
// })


app.use(cors()) 

// <<-----***express.json()****---->>
//This enables middleware us to access data from client side/browses through the request e.g req.body.data
app.use(express.json())


//    <!-----********app.use('/api/todos',signup)*****-----!>

// What this means is that  we mau not excute all the crud oprations  in index.js
//Therefore we carryout thre post,get e.tc oprations externaly and then import them e.g sighnup
//since in external excution of crud oprations we can access e.g app, 
//we insread use router intead of app e.g router.get to carry out the crud oprations extrnaly instrad of bloating the index.js 
//We export the external crud router as router and import it as a named import specify what is done within it e.g sighinup
//we then make the crud opration availabe by closing it in app.use(signup),This makes it available over browser
//We can also specify additional path for that external crud to be accesse e.g app.use('/books/ask',signup), what this shows is
//for you to sign up you must first use the path spaecified first i.e ''/book/ask, ,then proceed to the externsl crud opration signin,which may also havee its own internal routes 
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

mongoose.connect(connection_string ,{})// This is an asyncronous opreation we add a .then and .catch
.then(()=>{
    console.log("connection succesfull")
})
.catch((error)=>{console.error("Mongo db connection failed:",error.message)})
 