const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const User = require("../models/User");

const router = express.Router()

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message:"Token Required"})
    
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err) return res.json(401).json({message:"Invalid Token"})
        req.userId = decoded.userId;
        next();
    })
}

router.post("/",authenticate,async(req,res)=>{
    const {title,description,dueDate}=req.body;
    const task = await Task.create({
        title,description,dueDate,user:req.userId
    })
    res.status(201).json(task);
})

router.get("/",authenticate,async(req,res)=>{
    const tasks= await Task.find({user:req.userId});
    res.json(tasks);
})

router.put("/:id",authenticate,async(req,res)=>{
    const tasks = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(tasks);
})

router.delete("/:id",authenticate,async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id)
    res.status(204).send();
})

module.exports = router;
