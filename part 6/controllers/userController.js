const registerValidator = require('../validator/registerValidator')


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
            res.status(200).json({
                message:'everything is ok'
            })
        }
        // check for duplicate user data 
        // new user object 
        // save to database 


    }
}