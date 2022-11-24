const User = require ('../modules/user')
const express = require('express')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')

const router = express.Router()

router.post('/',async (req,res)=>{
    const schema = joi.object({

        email: joi.string().min(3).max(30).required(),
        password:joi.string().min(6).max(200).required(),
        
    })
    const {error} = schema.validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
    console.log(error)

    try{
        
        let user = await User.findOne({email: req.body.email})        
        if(!user) return res.status(400).send("Invalid email or password")
        const validpass =  bcrypt.compare(req.body.password,user.password)

        if (!validpass) return res.status(400).send("Invalid email or password")

        const secretkey = process.env.SECRET_KEY
        const token = jwt.sign({_id:user._id,name:user.name,email:user.email},secretkey)
        res.send(token)

    
    
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)
    }

    }

)

module.exports = router