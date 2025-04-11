const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const User=require('./models/User')
const Productroutes=require('./routes/Productroutes')



const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use('/Product',Productroutes)

//connet atlast cloud db

mongoose.connect('mongodb+srv://Ankita:Ankita%40123@cluster0.mrm2hzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>
console.log('databse connection')).catch((err)=>
console.log(err))

server.post('/register',async(req,res)=>{
    try{
        const{fullName,userName,age,password}=req.body
        const userObj=new User({fullName,userName,age,password})
        await userObj.save()
        res.json({
            status:true,message:'registration successfully'
        })
    }catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })
    }


})

server.post('/Login',async(req,res)=>{
    try{

       const{userName,password}=req.body
       const userExist=await User.findOne({userName})
       if(!userExist){
        return res.json({
            status:false,
            message:'user not found!!'
        })
       }
        if(password !==userExist.password){
            return res.json({
                status:false,
                message:'wrong password'
            })
        }
        
       
       res.json({
        status:true,
        message:'login succefully'
    })


    }catch(err){
        res.json({
            status:false,
            message:`Error:${err}`
        })

    }

})





server.listen(8055, () => {
    console.log('Server is listening on port 8055');
});
