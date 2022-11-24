const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router()
const joi = require('joi')
const User = require('../modules/user')






router.post('/', async (req,res)=>{
    const schema = joi.object({

        name:joi.string().min(3).max(30).required(),
        email: joi.string().min(3).max(30).required().email(),
        password:joi.string().min(6).max(200).required(),
        
    })
    const {error} = schema.validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
    console.log(error)

   


    try{
        
        let user = await User.findOne({email: req.body.email})
        if(user) return res.status(400).send("That email alredy exists")

        const {name,email,password} = req.body

        user = new User({
            name,
            email,
            password
           
        })

        const saltRounds = 10

        user.password =  bcrypt.hash(user.password, saltRounds);
        await user.save()
        res.send("user created")
        
        
     
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)
    }

  
})

module.exports = router
