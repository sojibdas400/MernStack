module.exports = {
    serverError(res,error){
        Console.log(error);
        res.status(500).json({
            message: "Server error occurd"
        });
    },
    resourceError(res,message){
        res.status(400).json({
            message
        });
    }
}