const mongoose = require("mongoose")

const taskSchema= new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,enum:["Pending","In Progres","Completed"],default:"Pending"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    dueDate:{type:Date},
})

module.exports = mongoose.model("Task",taskSchema);