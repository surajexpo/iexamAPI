const {User} = require("../../../models/authModels");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require("../../../utils/generateToken");
const signup = async(req, res)=>{
try{
    const mustData={
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    };
    // for(let key of mustData){
    //     if(![key] || [key] =='' ){
    //       throw  new Error(`${key} is required`, 404); 
    //     }
    // }
    const isExist = await User.findOne({email:mustData.email}).lean();
    if(isExist){
        throw new Error('email is already exist ', 403);
    }
    if(req.body.phone){
        mustData.phone = req.body.phone
    }
    // const hashedPassword = bcrypt.hashSync(mustData.password,10);
    // mustData.password = hashedPassword;

    const data = new User(mustData);
    await data.save();

    // const token = jwt.sign({_id:data._id},"yahaSecretDalnaHai.envSE");
    const token = generateToken({_id:data._id});

    return res.status(201).json({status:true, result:{data,token}, message:"sexfully signup"})


  }catch(err){
  res.status(500).json({status:false, error:err.message})
  }
}

module.exports = signup;