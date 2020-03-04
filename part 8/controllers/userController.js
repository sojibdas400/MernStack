const bcrypt = require('bcrypt');
const registerValidator = require('../validator/registerValidator');
const jwt = require('jsonwebtoken');
const loginValidator = require('../validator/loginValidator');
const User = require('../model/User');
const {serverError,resourceError} =require('../util/error');

module.exports ={
    login(req,res){
        // extract data from request 
        let {password,email} = req.body;

        // validate data 
        let validate = loginValidator({email,password});

        if (!validate.isValid){
            return res.status(400).json(validate.error)
        }

        // user availability 
        User.findOne({email})
        .then(user =>{

            if(!user){
                return resourceError(res,'User not found');
            }

            bcrypt.compare(password,user.password,(error,result)=>{
                if(error){
                    return serverError(res,error);
                }
            
                if(!result){
                    return resourceError(res,'password does not match');
                }

                // generate token 
                let token = jwt.sign({
                    _id:user._id,
                    name:user.name,
                    email:user.email 
                },'SECRET',{expiresIn:'2h'});

                res.status(200).json({
                    message: 'Login Succesfull',
                    token :`Bearer ${token}`
                });
            });
        })
        .catch(error=>serverError(res,error));
    },
    register(req,res){
        // read client data
        let {name,email,password, confirmPassword} = req.body;

        // validation check user data 
        let validate = registerValidator({name,email,password,confirmPassword});

        if ( !validate.isValid){
            res.status(400).json(validate.error)
        }else{
            User.findOne({email})
            .then(user=>{
                if(user){
                    return resourceError(res,'Email already exists');
                }
                bcrypt.hash(password,11,(error,hash)=>{
                    if (error){
                        return resourceError(res,'server error occured');
                    }
                    let user = new User({
                        name,
                        email,
                        password: hash
                    });
                    user.save()
                    .then(user=>{
                        res.status(201).json({
                            message:"user created successfuly",
                            user
                        });
                    })
                    .catch(error=>serverError(res,error));
                });
            })
            .catch(error=>serverError(res,error));
        }
    }
}