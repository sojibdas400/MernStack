const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.json({
        message: 'welcome to our app hh' 
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("server is running at port ${PORT}");
    mongoose.connect('mongodb://localhost:27017/MERN', 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        },
        ()=>{
            console.log("database connected");
        }
    )
});








