const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config();
const userController = require("./routes/user")
const listController = require("./routes/list")

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.listen(process.env.PORT || 3009 , (err)=>{
        if(!err){
            console.log("Server started at port 3009")
        }else{
            console.log(err)
        }
})

//mongoose.connect("mongodb://localhost/todo-app",()=>{
    mongoose.connect("mongodb+srv://pranjay:Pranjay9199@cluster0.mzmgp.mongodb.net/todo-app?retryWrites=true&w=majority",()=>{
    console.log("Successfully connected to db")
},(err)=>{
    console.log(err)
})

app.get("/" , (req,res)=>{
    res.send("todo server")
})

app.use("/user" , userController)
app.use("/list" , listController)