const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const userModel = require("../models/user")
const listModel = require("../models/list")

router.post("/add", (req, res)=>{
    try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        userModel.find({email:user}).then((data)=>{
            if(data.length){
                listModel.create({
                    activity:req.body.activity,
                    status: req.body.status,
                    timetaken: req.body.timetaken,
                    action:req.body.action
                }).then(()=>{
                    res.status(200).send("Activity Added")
                })
            } else{
                res.status(400).send('Unauthorize user')
            }
        }).catch((err)=>{
            res.status(400).send(err);
        })

    } catch(err) {
        // console.log(err)
        res.status(400).send("Unauthorize user")
    }    
   
})

router.get("/list", (req,res)=>{
    const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
    userModel.find({email:user}).then((data)=>{
        if(data.length){
            listModel.find({activity}).then((data)=>{
                res.status(200).send({task: data})
            })
        } else{
            res.status(400).send('Unauthorize user')
        }
})
});


module.exports  = router