const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userModal = require("../models/user")
const salt=10
//const crypto = require("crypto")

//const secretKey = crypto.randomBytes(64).toString("hex");

router.post("/register" , async(req,res)=>{
        const email = await userModal.find({email:req.body.email})
        if(email.length){
            res.status(400).send("User already exist")
        }else{
            bcrypt.genSalt(salt , (saltErr , saltVal)=>{
                if(!saltErr){
                    bcrypt.hash(req.body.password , saltVal , (hashErr , hashVal)=>{
                        if(!hashErr){
                            userModal.create({username:req.body.username , email:req.body.email , password:hashVal , conform_password:hashVal})
                            res.status(200).send("User registered successfully")
                        }else{
                            res.status(400).send(hashErr)
                        }
                    })
                }else(
                    res.status(400).send(saltErr)
                )
            })
        }
})

router.post("/login", async(req,res)=>{
    const loginData = await userModal.find({email:req.body.email})
    if(loginData.length){
        const data = await bcrypt.compare(req.body.password , loginData[0].password)
        if(data){
            const authToken = jwt.sign(loginData[0].email , process.env.SECRET_KEY)
            const username = loginData[0].username
            res.status(200).send({authToken:authToken , username:username})
        }else{
            res.status(400).send("Invalid password")
        }
    }else{
        res.status(400).send("Invalid user")
    }
})

module.exports = router