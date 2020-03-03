const router = require('express').Router();

// Registration Route
router.post('/register',(req,res)=>{
    res.json({
        message:`register`
    })
})

// Login Route 
router.post('/login',(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    res.json({
        message:`login name ${name} and email ${email}`
    })
})

module.exports = router