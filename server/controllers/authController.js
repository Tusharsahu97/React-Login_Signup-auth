const User = require('../models/user');
const {hashPassword,comparePassword} =require('../helpers/auth');
const jwt =require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const test = (req,res)=>{
   res.json("Test is working ");
}

//register endpoint
const registerUser = async(req,res)=>{
   try {
    const{name,email,password} = req.body;
    //check name is entered or not
    if(!name){
        return res.json({
            message:'Name is required'
        })
    };
    //check password
    if(!password || password.length < 6){
        return   res.json({
            message:"Password is Required and should be at least six characters"
        })
    };
    //check email
    const exist = await User.findOne({email});
    if(exist){
        return res.json({
            message:"Email is already existed"
        })
    }

    const hashedPassword = await hashPassword(password)
    //create user in database
     const user = await User.create({
        email,
        name,
        password:hashedPassword,
     })
     return res.json(user);


   } catch (error) {
     console.log(error);
   }
}

//login endpoint
const loginUser = async(req,res) =>{
  try {
    const {email,password} = req.body;
    //check if user exists
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            message:"Please Register Yourself"
        })
    }

    //check if password match
    const match = await comparePassword(password,user.password)
    if(match){
        jwt.sign({email:user.email,id:user._id,name:user.name},secretKey,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(user)
        })
    }
    if(!match){
        message:"Password not Match";
    }
  } catch (error) {
     console.log(error);
  }
}

const getProfile = (req, res) => {
  const{token} = req.cookies
  if(token){
    jwt.verify(token,secretKey,{}, (err,user)=>{
        if(err) throw err;
        res.json(user)
    })
  }else{
    res.json(null)
  }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile

}