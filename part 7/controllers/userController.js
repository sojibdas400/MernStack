const registerValidator = require('../validator/registerValidator')
const bcrypt = require('bcrypt');
const User = require('../model/User')

module.exports ={
    login(req,res){
        let name = req.body.name;
        let email = req.body.email;
        res.json({
            message:`login name ${name} and email ${email}`
        })
    },
    register(req,res){
        // read client data
        let {name,email,password, confirmPassword} = req.body;

        // validation check user data 
        let validate = registerValidator({name,email,password,confirmPassword})

        if ( !validate.isValid){
            res.status(400).json(validate.error)
        }else{
            User.findOne({email})
            .then(user=>{
                if(user){
                    res.status(400).json({
                        message:"email already exits"
                    })
                }   

                bcrypt.hash(password,11,(err,hash)=>{
                    if (err){
                        return res.status(500).json({
                            message:"server error occured"
                        })
                    }


                    let user = new User({
                        name,
                        email,
                        password: hash
                    })

                    user.save()
                    .then(user=>{
                        res.status(201).json({
                            message:"user created successfuly"
                        })
                    })
                    .catch(error=>{
                        console.log(error);
                        res.status(500).json({
                            message:"server eror occured"
                        })
                        
                    })    
                })

            })
            .catch(error=>{
                console.log(error);
                res.status(500).json({
                    message:"server error occured"
                })
            })
        }
        // check for duplicate user data 
        // new user object 
        // save to database 


    }
}