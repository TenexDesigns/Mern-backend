const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name:{type:String,required:true, minlength:3, maxlength:200},
    author:String,
    uid:String,
    isComplete:Boolean,
    date:{type:Date,default : new Date()}
})

const Todo =mongoose.model('Todo',todoSchema)


module.exports = Todo






//The are used when you use require to import/bring in exter
//module.exports = Todo  //no need to destructure as it is already destructured {model: Todo}
//These two are basically the same
//module.exports.Todo =Todo // gives out an object and need too be destructrued   { Todo: Model { Todo } }
//exports.Todo = Todo  // gives out an object and need too be destructrued   { Todo: Model { Todo } }
//To use Import statements ,which is a E6 feature
//1.Go to the package.json file and add "type":"module"
//2. Then you will be able to use the import statements in your node.js e.g import express from 'express'
// 3.when you use import to bring  modules into  your files instead of  require ,you have to export your modules using 
// export default 'name of module'   
//4.This will give you  the same asnwe as module.export that does not need to be destructrued