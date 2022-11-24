const Todo = require ('../modules/todo')
const express = require('express')
const joi = require('joi')
const auth = require('../middleware/auth')

const router = express.Router()




router.put('/:id',async (req,res)=>{
    
    const schema = joi.object({

        name:joi.string().min(3).max(200).required(),
        author: joi.string(),
        uid:joi.string(),
        isComplete: joi.boolean(),
        date:joi.date()

    })

    const {error} = schema.validate(res.body)
    if(error) res.status(400).send(erroe.details[0].message)
    console.log(error)

    const todos = await Todo.findById(req.params.id)

    if (!todos) return res.status(404).send("Todo not found")


    const { name,author, isComplete,date,uid} = req.body

     try{

   const update = await Todo.findByIdAndUpdate(req.params.id,
    { name,author, isComplete,date,uid},{new:true})

    res.send(update)}catch(error){
        res.status(500).send(error.message)
        console.log(error.message)

    }



     


})



router.delete('/',async (req,res)=>{

    try{
    const todos = await Todo.deleteOne({isComplete:true})
    res.send(todos)
    }catch(error){
        res.status(500).send(error.message)
    }

})

router.get('/',async (req,res)=>{

    try{
    const todos = await Todo.find()

    res.send(todos)
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)

    }
})

router.post('/',auth, async (req,res)=>{

    const schema = joi.object({

        name:joi.string().min(3).max(200).required(),
        author: joi.string(),
        uid:joi.string(),
        isComplete: joi.boolean(),
        date:joi.date()

    })

    const {error} = schema.validate(res.body)
    if(error) res.status(400).send(error.details[0].message)
    console.log(error)

    

    const { name,author, isComplete,date,uid} = req.body

    let todo = new Todo({
        name,
        author,
        isComplete,
        date,
        uid
    })

try{

    todo = await todo.save() ;
     res.send(todo)
    



}catch(error){

    res.status(500).send(error.message)
    console.log(error.message)

}


   

    
    
    
    
    
    
   // todo.save().then((todo)=>{
     //   res.send(todo)
   // }).catch((error)=>{
     //   console.log(error.message)
    //})



})

module.exports = router
